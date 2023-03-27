import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "src/utilities/responses/wrapper.response";
import { RolesService } from "./roles.service";
import { CreateRolesDto, UpdateRolesDto } from "./dto/roles.dto";
import { ListingParams } from "src/utilities/global.dto";
import { ResponseRoles } from "src/swagger-responses/roles-swagger";
import { ApiAuthPermission } from "../decorators/api-permissions.decorator";
import { ApiController } from "../decorators/api-controller.decorator";

// @ApiTags("Roles")
// @Controller("roles")
@ApiController({version: "1", tag: "Roles Management", path: "/roles"})
@ApiAuthPermission()
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get("/")
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: true,
  })
  async getAllRoles(
    @Query() listingParams: ListingParams
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.rolesService.getAllRoles(listingParams);
  }

  @Post("/")
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: false,
  })
  async createClient(
    @Body() createRolesDto: CreateRolesDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.rolesService.createRole(createRolesDto);
  }

  @Get(":id")
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: false,
  })
  async findOne(@Param("id") id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({
    type: ResponseRoles,
    status: HttpStatus.OK,
    isArray: false,
  })
  update(
    @Param("id") id: string,
    @Body() updateRolesDto: UpdateRolesDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return this.rolesService.update(+id, updateRolesDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
