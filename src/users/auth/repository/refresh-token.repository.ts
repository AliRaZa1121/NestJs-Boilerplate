import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { RefreshTokenStatus } from "../../../utilities/enums";
import { InternalServerErrorException } from "@nestjs/common";
import { errorApiWrapper } from "../../../utilities/responses/wrapper.service";
import {
  RefreshTokenCreate,
  RefreshTokenWhereClause,
} from "../../../utilities/interface";
import { makeRefreshToken } from "../../../helpers/util.helper";

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken> {
  constructor() {
    super();
  }

  async firstOrCreateToken(data: RefreshTokenCreate): Promise<RefreshToken> {
    try {
      const { user_id, type } = data;
      const checkIfExist = await this.findOneRefreshToken({
        user_id: user_id,
        type: type,
        status: RefreshTokenStatus.ALIVE,
      });
      if (checkIfExist) {
        let updateRecord = this.create(data);
        await this.update({ id: checkIfExist.id }, updateRecord);
        return this.findOneRefreshToken({ id: checkIfExist.id });
      } else {
        let record = this.create({ ...data });
        record = await this.save(record);
        return record;
      }
    } catch (error) {
      throw new InternalServerErrorException(errorApiWrapper(error.message));
    }
  }

  async expireToken(token) {
    try {
      return await this.update(
        { token: token },
        { status: RefreshTokenStatus.EXPIRED }
      );
    } catch (e) {
      return false;
    }
  }

  async findOneRefreshToken(
    data: RefreshTokenWhereClause
  ): Promise<RefreshToken> {
    return await this.findOne(data);
  }
}
