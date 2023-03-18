import { ApiProperty } from "@nestjs/swagger";

export class ResponseRoleBody {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ResponseRoles {
  @ApiProperty()
  attributes: ResponseRoleBody;

  @ApiProperty()
  id: number;
}
