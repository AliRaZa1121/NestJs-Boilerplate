import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/mail/mail.service";
import { RolesRepository } from "src/roles/roles.repository";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";
import { errorApiWrapper } from "../utilities/responses/wrapper.service";
import { AuthRegisterDto } from "./dto/authentications.dto";
import { ListingDataFromRepository } from "../utilities/interface";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "../utilities/responses/wrapper.response";
import { sendError } from "../helpers/error-handling.helper";
import { ResponseUserInterface } from "../utilities/responses/response-interface";
import { ListingParams } from "../utilities/global.dto";
import {
  singleUserListingMapper,
  usersListingMapper,
} from "../mapper/user.mapper";
import {
  listingApiWrapper,
  listingApiWrapperPaginate,
} from "../../dist/utilities/response.service";
import { CreatUserDto, UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @Inject(MailService) private mailService: MailService,
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository
  ) {}

  async getUsers(
    listingParams: ListingParams
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const users: ListingDataFromRepository =
        await this.usersRepository.getUsers(listingParams);
      const { page, take, total } = users;
      const data: ResponseUserInterface[] | User[] = usersListingMapper(
        users.data
      );
      return listingApiWrapperPaginate(data, { page, take, total });
    } catch (e) {
      return sendError(e);
    }
  }

  async showUser(id: number): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const user: User = await this.usersRepository.findById(id);
      if (!user) {
        throw new BadRequestException(`Invalid user id ${id}`);
      }
      const data: ResponseUserInterface | User = singleUserListingMapper(user);
      return listingApiWrapper(data);
    } catch (e) {
      return sendError(e);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.getUserByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async createUser(
    CreateUserDto: CreatUserDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const createdUser = await this.usersRepository.createUser(CreateUserDto);
      if (!createdUser) {
        throw new InternalServerErrorException(`Error while creating user`);
      }
      const data: ResponseUserInterface = singleUserListingMapper(createdUser);
      return listingApiWrapper(data);
    } catch (e) {
      return sendError(e);
    }
  }

  async registerUser(authRegisterDto: AuthRegisterDto): Promise<User> {
    try {
      const createdUser = await this.usersRepository.createUser(
        authRegisterDto
      );
      if (!createdUser) {
        throw new InternalServerErrorException(`Error while creating user`);
      }
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const checkIfExist = await this.usersRepository.findById(id);
      if (!checkIfExist) {
        throw new BadRequestException(`Invalid user id ${id}`);
      }
      const updateUser = await this.usersRepository.updateUser(
        id,
        updateUserDto
      );
      const data: ResponseUserInterface = singleUserListingMapper(updateUser);
      return listingApiWrapper(data);
    } catch (e) {
      return sendError(e);
    }
  }

  async updatePassword(id: number, password: string): Promise<boolean> {
    try {
      const updateDto = this.usersRepository.create({ password: password });
      await this.usersRepository.update({ id: id }, updateDto);
      return true;
    } catch (e) {
      return false;
    }
  }

  async validateUser(id): Promise<User> {
    try {
      return await this.usersRepository.validateUser(id);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkIfUserExists(data): Promise<User> {
    return await this.usersRepository.findOne({ where: data });
  }

  async deleteUser(
    id: number
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const checkIfExist = await this.usersRepository.findById(id);
      if (!checkIfExist) {
        throw new BadRequestException(`Invalid user id ${id}`);
      }
      await this.usersRepository.softDelete(id);
      return listingApiWrapper(
        checkIfExist,
        `User has been deleted successfully`
      );
    } catch (e) {
      return sendError(e);
    }
  }
}
