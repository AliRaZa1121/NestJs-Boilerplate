import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}

export class FilterRoleDto {
  @ApiProperty({
    required: false,
    description: "Role filter by type",
    enum: ["user", "employee"],
  })
  @IsOptional()
  @IsEnum(["user", "employee"], { message: "value must be user,employee" })
  type?: string;

  @ApiProperty({ required: false, description: "User filter by is_contact" })
  @IsOptional()
  is_contact?: number;
}
