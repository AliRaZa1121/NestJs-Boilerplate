import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesRepository } from "./roles.repository";
import { CreateRolesDto, UpdateRolesDto } from "./dto/roles.dto";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "src/utilities/responses/wrapper.response";
import {
  errorApiWrapper,
  successApiWrapper,
} from "src/utilities/responses/wrapper.service";
import { UsersService } from "src/users/users.service";
import { ListingParams } from "src/utilities/global.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository) private rolesRepository: RolesRepository,
    private usersService: UsersService
  ) {}

  async createRole(
    createRolesDto: CreateRolesDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      return await this.rolesRepository.createRole(createRolesDto);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getAllRoles(
    listingParams: ListingParams
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.rolesRepository.getAllRoles(listingParams);
  }

  async findOne(id: number): Promise<SuccessApiInterface | ErrorApiInterface> {
    return await this.rolesRepository.getRoleById(id);
  }

  async update(id: number, requestUpdateRolesDto: UpdateRolesDto) {
    return await this.rolesRepository.updateRolesById(
      id,
      requestUpdateRolesDto
    );
  }

  async remove(id: number) {
    await this.rolesRepository.deleteRolesById(id);
    return successApiWrapper(null, "role deleted successfully");
  }
}
