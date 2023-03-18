import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

export class AuthLoginDto {
  @ApiProperty({
    default: "string@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: "string",
  })
  @IsString()
  password: string;
}

export class AuthRegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  first_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string;

  @ApiProperty()
  @IsString()
  role_id: string;
}

export class ForgetPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}

export class CompleteRegistrationDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDataDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ResetPasswordDto)
  data: ResetPasswordDto;
}

export class ResetPasswordPostDataDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  password: string;
}

export class ResetPasswordApiDto {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  otp: string;
}

export class ChangePasswordApiDto {
  @IsString()
  @ApiProperty()
  password: string;
}
