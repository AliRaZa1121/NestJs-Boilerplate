import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  AuthLoginDto,
  AuthRegisterDto,
  ChangePasswordApiDto,
  ForgetPasswordDto,
  ResetPasswordApiDto,
  VerifyOtpDto,
} from "../dto/authentications.dto";
import { UsersService } from "../users.service";
import { hashCheck } from "src/helpers/bcrypt.helper";
import {
  errorApiWrapper,
  successApiWrapper,
} from "src/utilities/responses/wrapper.service";
import { loginMapper } from "../../mapper/user.mapper";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "../../utilities/responses/wrapper.response";
import {
  RefreshTokenStatus,
  RefreshTokenType,
  UserStatus,
} from "src/utilities/enums";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshTokensRepository } from "./repository/refresh-token.repository";
import { sendError } from "src/helpers/error-handling.helper";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "./entities/refresh-token.entity";
import {
  JwtPayload,
  RefreshTokenCreate,
  RefreshTokenWhereClause,
  ResponseLoginInterface,
} from "src/utilities/interface";
import { MailService } from "src/mail/mail.service";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(RefreshTokensRepository)
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async signIn(
    AuthLoginDto: AuthLoginDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    const { email, password } = AuthLoginDto;
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user && (await hashCheck(password, user.password))) {
        if (user.status === UserStatus.PENDING) {
          throw new BadRequestException(
            `Your account is deactivated. Please contact the administrator`
          );
        }
        const payload: JwtPayload = {
          sub: user.id,
          email: email,
          family_name: user.first_name,
          given_name: user.last_name,
        };
        const accessToken: string = this.jwtService.sign(payload);
        const data: ResponseLoginInterface = loginMapper({
          token: accessToken,
          user: user,
        });
        return successApiWrapper(data);
      } else {
        throw new UnauthorizedException("Please check your login credentials");
      }
    } catch (error) {
      return sendError(error);
    }
  }

  async signUp(
    authRegisterDto: AuthRegisterDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    const { email } = authRegisterDto;
    const checkIfEmailAlreadyExists = await this.userService.getUserByEmail(
      authRegisterDto.email
    );
    if (checkIfEmailAlreadyExists) {
      throw new ConflictException(`Email already exists`);
    }
    try {
      const user = await this.userService.registerUser(authRegisterDto);
      const payload: JwtPayload = {
        sub: user.id,
        email: email,
        family_name: user.first_name,
        given_name: user.last_name,
      };
      const accessToken: string = this.jwtService.sign(payload);
      const data = loginMapper({ token: accessToken, user: user });
      return successApiWrapper(data);
    } catch (error) {
      return sendError(error);
    }
  }

  async forgetPassword(data: ForgetPasswordDto) {
    try {
      let { email } = data;
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException(`User Does not exist`);
      }
      const token = await this.firstOrCreateToken({
        user_id: user.id,
        type: RefreshTokenType.OTP,
      });
      await this.mailService.sendForgetPasswordEmail(user.email, token);
      return successApiWrapper(
        null,
        "Forget Password mail has been send successfully"
      );
    } catch (e) {
      return sendError(e);
    }
  }

  async verifyOtp(payload: VerifyOtpDto): Promise<any> {
    try {
      const user = await this.userService.getUserByEmail(payload?.email);

      if (!user) {
        throw new BadRequestException("User Not Found");
      }
      const refreshToken = await this.verifyRefreshToken({
        user_id: user?.id,
        token: payload?.otp,
        status: RefreshTokenStatus.ALIVE,
      });

      if (!refreshToken) {
        throw new BadRequestException("OTP is not correct");
      }

      return successApiWrapper(
        { msg: "OTP is correct", success: true },
        "Otp matched successfully"
      );
    } catch (e) {
      return sendError(e);
    }
  }

  async resetPassword(data: ResetPasswordApiDto) {
    try {
      let user = await this.userService.getUserByEmail(data.email);
      if (!user) {
        throw new BadRequestException("User Not Found");
      }
      const refreshToken = await this.verifyRefreshToken({
        user_id: user?.id,
        token: data?.otp,
        status: RefreshTokenStatus.ALIVE,
      });
      if (!refreshToken) {
        throw new BadRequestException("OTP is not correct");
      }
      await this.refreshTokensRepository.expireToken(refreshToken.token);
      const updatePassword = this.userService.updatePassword(
        user.id,
        data.password
      );
      if (!updatePassword) {
        throw new InternalServerErrorException("Something went wrong");
      }
      return successApiWrapper(null, "Password Rested Successfully");
    } catch (e) {
      return sendError(e);
    }
  }

  async changePassword(data: ChangePasswordApiDto, AuthUser: User) {
    try {
      const updatePassword = this.userService.updatePassword(
        AuthUser.id,
        data.password
      );
      if (!updatePassword) {
        throw new InternalServerErrorException("Something went wrong");
      }
      return successApiWrapper(null, "Password Rested Successfully");
    } catch (e) {
      return sendError(e);
    }
  }

  async firstOrCreateToken(data: RefreshTokenCreate): Promise<RefreshToken> {
    try {
      return this.refreshTokensRepository.firstOrCreateToken(data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async verifyRefreshToken(
    data: RefreshTokenWhereClause
  ): Promise<RefreshToken> {
    try {
      return this.refreshTokensRepository.findOneRefreshToken(data);
    } catch (e) {
      throw new InternalServerErrorException(errorApiWrapper(e.message));
    }
  }

  async expireRefreshToken(id): Promise<boolean> {
    await this.refreshTokensRepository.update(
      { id: id },
      { status: RefreshTokenStatus.EXPIRED }
    );
    return true;
  }
}
