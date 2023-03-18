import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import { Roles } from "src/roles/entities/roles.entity";
import { hashMake } from "src/helpers/bcrypt.helper";
import { UserStatus } from "src/utilities/enums";
import { SqlBaseEntity } from "../../entity/base-entity";

@Entity("users")
export class User extends SqlBaseEntity {
  @ManyToOne(() => Roles, (Role) => Role.id)
  @JoinColumn({
    name: "role_id",
  })
  role: Roles | any;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ type: "varchar", length: 100, unique: false, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  first_name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  last_name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async convertHashPassword() {
    this.password = await hashMake(this.password);
  }
}
