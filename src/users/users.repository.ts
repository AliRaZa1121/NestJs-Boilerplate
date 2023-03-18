import { EntityRepository, Like, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { AuthRegisterDto } from "./dto/authentications.dto";
import { ResponseUserInterface } from "../utilities/responses/response-interface";
import { ListingParams } from "../utilities/global.dto";
import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ListingDataFromRepository } from "../utilities/interface";
import { CreatUserDto, UpdateUserDto } from "./dto/user.dto";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "../utilities/responses/wrapper.response";
import { sendError } from "../helpers/error-handling.helper";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor() {
    super();
  }

  async getUsers(
    listingParams: ListingParams
  ): Promise<ListingDataFromRepository> {
    try {
      let { search, take, page } = listingParams;
      take = take || 10;
      page = page || 1;
      const skip = (page - 1) * take;
      const [data, total] = await this.findAndCount({
        relations: ["role"],
        where: [
          {
            ...(search && {
              first_name: Like(`%${search}%`),
              last_name: Like(`%${search}%`),
            }),
          },
          {
            ...(search && {
              email: Like(`%${search}%`),
            }),
          },
        ],
        take: take,
        skip: skip,
        order: {
          id: "DESC",
        },
      });
      return { data, page, take, total } as ListingDataFromRepository;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async createUser(createUserData): Promise<User> {
    const user = this.create({ ...createUserData });
    await this.save(user);
    return this.getUserByEmail(createUserData.email);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.update({ id: id }, updateUserDto);
      return await this.findById(id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({
      email: email,
    });
  }

  async findById(id: number): Promise<User> {
    return this.findOne({
      id: id,
    });
  }

  async validateUser(id): Promise<User> {
    return this.findOne({
      relations: ["role_id"],
      where: {
        id: id,
      },
    });
  }
}
