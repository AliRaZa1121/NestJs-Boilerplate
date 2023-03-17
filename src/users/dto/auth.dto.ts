import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UserRoles } from 'src/constant/enum';
import { UserExistsRule } from '../../decorators/custom-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}

export class ForgetPasswordRequest {
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}

export class ResetPasswordRequest {
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly code: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @ApiProperty()
  readonly password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({ default: 'test@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  @Validate(UserExistsRule, {
    message: 'User $value already exists. Choose another email.',
  })
  email: string;

  @ApiProperty()
  @IsOptional()
  @Validate(UserExistsRule, {
    message: 'phone number already exists. Choose another phone.',
  })
  phone: number;

  @ApiProperty({ enum: ['User'], description: 'Optional' })
  @IsOptional()
  role: UserRoles;
}
