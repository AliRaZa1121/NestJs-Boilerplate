import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  ForgetPasswordRequest,
  ResetPasswordRequest,
} from '../dto/auth.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiResponses } from 'src/decorators/middlware';
import { Response } from 'src/constant/response';

@Controller()
@ApiTags('Auth APIs')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponses(false)
  public async register(@Body() data: RegisterDto): Promise<Response> {
    return await this.authService.register(data);
  }

  @Post('login')
  @ApiResponses(false)
  public async login(@Body() loginUserDto: LoginDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Post('/forget-password')
  @ApiResponses(false)
  async ForgetPassword(@Body() data: ForgetPasswordRequest) {
    return await this.authService.ForgetPassword(data);
  }

  @Post('/reset-password')
  @ApiResponses(false)
  async ResetPassword(@Body() data: ResetPasswordRequest) {
    return await this.authService.ResetPassword(data);
  }
}
