import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Like, Repository } from "typeorm";
import { Roles } from "./entities/roles.entity";
import {
  ErrorApiInterface,
  SuccessApiInterface,
} from "src/utilities/responses/wrapper.response";
import { UpdateRolesDto } from "./dto/roles.dto";
import {
  errorApiWrapper,
  successApiWrapper,
  successApiWrapperPaginate,
} from "src/utilities/responses/wrapper.service";
import slugify from "slugify";
import { roleSingleMapper, rolesListingMapper } from "../mapper/roles.mapper";
import { ListingParams } from "src/utilities/global.dto";
import { ResponseRolesInterface } from "../utilities/interface";

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {
  async getRoleById(
    id: number
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const query = this.createQueryBuilder("roles")
        .select()
        .where("roles.id = :id", { id });
      const role = await query.getOneOrFail();
      const data: ResponseRolesInterface = roleSingleMapper(role);
      return successApiWrapper(data);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async checkRoleExistencesBySlug(slug: string) {
    const query = this.createQueryBuilder("roles").select();
    query.where("slug = :slug", { slug });
    return await query.getCount();
  }

  async createRole(requestClientDto) {
    const { name } = requestClientDto;
    try {
      const slug = slugify(name).toLowerCase();
      const newClient = this.create({
        ...requestClientDto,
        slug,
      });
      const role = await this.save(newClient);
      return successApiWrapper(null, `Role has successfully created`);
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async getAllRoles(
    listingParams: ListingParams
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      let { page, take } = listingParams;
      take = take || 10;
      page = page || 1;
      const skip = (page - 1) * take;

      let [roles, total] = await this.findAndCount({
        where: {
          ...(listingParams.search && {
            name: Like(listingParams.search),
          }),
        },
        take: take,
        skip: skip,
        order: {
          id: "DESC",
        },
      });
      const data: Roles[] | ResponseRolesInterface[] =
        rolesListingMapper(roles);
      return successApiWrapperPaginate(data, { page, take, total });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async updateRolesById(
    id: number,
    requestRolesDto: UpdateRolesDto
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    const { name } = requestRolesDto;
    const slug = slugify(name).toLowerCase();
    let updateAffected: number = 0;
    try {
      const query = this.createQueryBuilder("roles");
      const updateResult = await query
        .update({ ...requestRolesDto, slug })
        .andWhere("id = :id", { id })
        .andWhere("deleted_at is null")
        .execute();
      updateAffected = updateResult.affected;
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }

    if (updateAffected === 0) {
      throw new InternalServerErrorException(errorApiWrapper("Error Occured"));
    } else {
      return await this.getRoleById(id);
    }
  }

  async deleteRolesById(
    id: number
  ): Promise<SuccessApiInterface | ErrorApiInterface> {
    try {
      const deleteResponse = await this.softDelete(id);
      if (!deleteResponse.affected) {
        throw new InternalServerErrorException(
          errorApiWrapper("Error Occured")
        );
      }
      return successApiWrapper({
        data: "role deleted successfully!!",
      });
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async createRoleSeeder(rolesObject: [] | any[]): Promise<boolean> {
    try {
      rolesObject.filter(async (role) => {
        return (await this.checkRoleExistencesBySlug(role)) === 0;
      });

      for await (const single of rolesObject) {
        const slug = slugify(single.name).toLowerCase();
        const newClient = this.create({
          ...single,
          slug,
        });
        await this.save(newClient);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
