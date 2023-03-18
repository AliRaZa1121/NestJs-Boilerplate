import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { RefreshTokenStatus, RefreshTokenType } from "../../../utilities/enums";
import { SqlBaseEntity } from "../../../entity/base-entity";
import { hashMake } from "../../../helpers/bcrypt.helper";
import { makeRefreshToken } from "src/helpers/util.helper";

@Entity()
export class RefreshToken extends SqlBaseEntity {
  @Column({
    type: "enum",
    enum: RefreshTokenType,
    default: RefreshTokenType.OTP,
  })
  type: RefreshTokenType;

  @Column({ type: "varchar", length: 255, nullable: false })
  token: string;

  @Column({
    type: "enum",
    enum: RefreshTokenStatus,
    default: RefreshTokenStatus.ALIVE,
  })
  status: RefreshTokenStatus;

  @Column({ type: "integer", unique: false, nullable: false })
  user_id: number;

  @BeforeInsert()
  @BeforeUpdate()
  async makeRefreshToken() {
    this.token = makeRefreshToken(this.type);
  }
}
