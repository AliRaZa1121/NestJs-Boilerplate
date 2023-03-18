import { Controller, HttpStatus, Post, Body } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { LoginResponse } from "src/swagger-responses/auth-swagger";
import { AuthService } from "./auth.service";
import {
  AuthLoginDto,
  AuthRegisterDto,
  ChangePasswordApiDto,
  ForgetPasswordDto,
  ResetPasswordApiDto,
  VerifyOtpDto,
} from "../dto/authentications.dto";
import { ApiAuthPermission } from "src/decorators/api-permissions.decorator";
import {
  SuccessApiInterface,
  ErrorApiInterface,
} from "src/utilities/responses/wrapper.response";
import { AuthUser } from "../../decorators/auth-user.decorator";

@ApiTags("Auth")
@Controller("/")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: LoginResponse,
    status: HttpStatus.OK,
  })
  @Post("login")
  signIn(
    @Body() authLoginDto: AuthLoginDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return this.authService.signIn(authLoginDto);
  }

  @ApiResponse({
    type: LoginResponse,
    status: HttpStatus.OK,
  })
  @Post("register")
  signUp(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.signUp(authRegisterDto);
  }

  @Post("/forget-password")
  async forgetPassword(
    @Body() data: ForgetPasswordDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.authService.forgetPassword(data);
  }

  @Post("verify-otp")
  public async verifyOtp(
    @Body() payload: VerifyOtpDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.authService.verifyOtp(payload);
  }

  @Post("/reset-password")
  async resetPassword(
    @Body() data: ResetPasswordApiDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.authService.resetPassword(data);
  }

  @Post("/change-password")
  @ApiAuthPermission(true)
  async changePassword(
    @Body() data: ChangePasswordApiDto,
    @AuthUser() user
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.authService.changePassword(data, user);
  }
}
