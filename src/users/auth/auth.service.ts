import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Now } from './../../helpers/date.helper';
import { AddHours, SubtractHours } from './../../helpers/date.helper';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  LoginDto,
  RegisterDto,
  ForgetPasswordRequest,
  ResetPasswordRequest,
} from '../dto/auth.dto';
import { LessThan, Repository } from 'typeorm';
import { Response } from 'src/constant/response';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { UsersService } from '../users.service';
import { LoginUserMapper } from '../entity-response';
import { ResponseObj } from '../../constant/response';
import { UserStatus } from '../../constant/enum';
import { ComparePassword } from 'src/helpers/util.helper';
import { GenerateVerificationCode } from '../../helpers/util.helper';
import { VerificationEntity } from '../entities/verification.entity';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: Repository<UserEntity>,
    @InjectRepository(VerificationEntity)
    private _verificationRepository: Repository<VerificationEntity>,
    @Inject(UsersService) private _userService: UsersService,
    private readonly jwtService: JwtService,
    public configService: ConfigService,
    private mailService: MailService,
  ) {}

  async register(registrationData: RegisterDto): Promise<Response> {
    try {
      const user = this._usersRepository.create({
        ...registrationData,
      });
      await user.save();
      const token = this._createAuthToken(user);
      ResponseObj.success = true;
      ResponseObj.statusCode = 201;
      ResponseObj.message = 'User registered successfully';
      ResponseObj.data = LoginUserMapper(user, token);
      return ResponseObj;
    } catch (err) {
      ResponseObj.message = err.message;
      ResponseObj.success = false;
      ResponseObj.statusCode = 500;
      ResponseObj.data = err;
      return ResponseObj;
    }
  }

  async login(data: LoginDto) {
    try {
      const user = await this.findByLogin(data);
      if (user) {
        const token = this._createAuthToken(user);
        ResponseObj.success = true;
        ResponseObj.statusCode = 200;
        ResponseObj.message = 'User log in successfully';
        ResponseObj.data = LoginUserMapper(user, token);
        return ResponseObj;
      }
    } catch (err) {
      ResponseObj.message = err.message;
      ResponseObj.success = false;
      ResponseObj.statusCode = 500;
      ResponseObj.data = err;
      return ResponseObj;
    }
  }

  async ForgetPassword(
    forgetPasswordRequest: ForgetPasswordRequest,
  ): Promise<Response> {
    try {
      const { email } = forgetPasswordRequest;
      const user = await this._usersRepository.findOne({
        where: { email: email },
      });

      if (!user) {
        ResponseObj.success = true;
        ResponseObj.statusCode = 401;
        ResponseObj.message = 'Invalid Email Address';
        return ResponseObj;
      }
      const code = GenerateVerificationCode();
      const data = {
        email: user.email,
        code: code,
      };
      const verification = this._verificationRepository.create({
        ...data,
      });
      const emailData = {
        email: user.email,
        name: user.name,
        text: `Below is your One Time Password (OTP) This OTP will be expire in 120 minutes :`,
        code: verification.code,
      };
      const emailSent = await this.mailService.sendEmailNotification(
        emailData,
        'verify-user',
      ); // email data subject and email etc and second param is for template name
      if (!emailSent) {
        ResponseObj.message = 'Error Occured while sending email';
        ResponseObj.success = false;
        ResponseObj.statusCode = 421;
        return ResponseObj;
      }
      verification.save();
      ResponseObj.success = true;
      ResponseObj.statusCode = 200;
      ResponseObj.message = 'Verification has been sent successfully';
      return ResponseObj;
    } catch (err) {
      ResponseObj.message = err.message;
      ResponseObj.success = false;
      ResponseObj.statusCode = 500;
      ResponseObj.data = err;
      return ResponseObj;
    }
  }
  async ResetPassword(data: ResetPasswordRequest): Promise<Response> {
    try {
      const { email } = data;
      const userExists = await this._userService.checkIfUserExists({
        email: email,
      });
      if (!userExists) {
        ResponseObj.success = true;
        ResponseObj.statusCode = 400;
        ResponseObj.message = 'Invalid User';
        return ResponseObj;
      }

      const checkCode = await this.checkVerificationCode(data);
      if (!checkCode) {
        ResponseObj.success = true;
        ResponseObj.statusCode = 400;
        ResponseObj.message = 'Invalid Verification Code';
        return ResponseObj;
      }
      userExists.password = data.password;
      userExists.update();
      userExists.save();
      ResponseObj.success = true;
      ResponseObj.statusCode = 200;
      ResponseObj.message = 'Password has been updated successfully';
      return ResponseObj;
    } catch (err) {
      ResponseObj.message = err.message;
      ResponseObj.success = false;
      ResponseObj.statusCode = 500;
      ResponseObj.data = err;
      return ResponseObj;
    }
  }

  async findByLogin({ email, password }): Promise<UserEntity> {
    const user = await this._usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await ComparePassword(password, user.password);
    if (!areEqual) {
      throw new HttpException(`Invalid credentials`, HttpStatus.UNAUTHORIZED);
    }
    if (user.status == UserStatus.Unverified) {
      throw new HttpException(
        `Account has been ${user.status}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async validateUser(payload): Promise<LoginDto> {
    const user = await this._userService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async checkVerificationCode(data: any): Promise<boolean> {
    const verification = await this._verificationRepository.findOne({
      where: {
        email: data.email,
        code: data.code,
      },
      order: {
        id: 'DESC',
      },
    });
    if (verification) {
      return true;
    }
    return false;
  }

  private _createAuthToken(data): any {
    const expiresIn = process.env.EXPIRESIN;
    const user = {
      userId: data._id,
      email: data.email,
    };
    const accessToken = this.jwtService.sign(user);
    return { expiresIn, accessToken };
  }
}
