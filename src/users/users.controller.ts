import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiAuthPermission } from "../decorators/api-permissions.decorator";
import { ListingParams } from "../utilities/global.dto";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "../utilities/responses/wrapper.response";
import { CurrentUser } from "../../dist/users/jwt/jwt.strategy";
import { User } from "./entities/user.entity";
import { CreatUserDto, UpdateUserDto } from "./dto/user.dto";

@ApiTags("Users")
@Controller("users")
@ApiAuthPermission()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUserList(
    @Query() listingParams: ListingParams
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return this.userService.getUsers(listingParams);
  }

  @Post("/")
  createUser(
    @Body() createBatchDto: CreatUserDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return this.userService.createUser(createBatchDto);
  }

  @Get("/:user_id")
  async showUser(
    @Param("user_id") user_id: number,
    @CurrentUser() current_user: User
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.userService.showUser(user_id);
  }

  @Get("/auth/me")
  async getAuthUser(
    @CurrentUser() user
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.userService.showUser(user.id);
  }

  @Put("/:user_id")
  async updateUser(
    @Param("user_id") user_id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.userService.updateUser(+user_id, updateUserDto);
  }

  @Delete("/:user_id")
  async deleteUser(
    @Param("user_id") user_id: string
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.userService.deleteUser(+user_id);
  }
}
