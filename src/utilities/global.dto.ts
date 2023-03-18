import { IsNotEmpty, IsOptional, MaxLength, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ListingParams {
  @ApiProperty({
    required: false,
    description: "Listing parameters Page Number",
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    required: false,
    description: "Listing parameters Per Page Limit",
  })
  @IsOptional()
  take?: number;

  @ApiProperty({
    required: false,
    description: "Search by name, title or code",
  })
  @IsOptional()
  search?: string;
}

export class TabsDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  x: number;

  @ApiProperty()
  @IsNotEmpty()
  y: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(55)
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  placeholder: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  selected: string;

  @ApiProperty()
  @IsNotEmpty()
  required: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  pageNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  width: number;

  @ApiProperty()
  @IsOptional()
  fontSize: string;

  @ApiProperty()
  @IsOptional()
  groupId: string;
}
