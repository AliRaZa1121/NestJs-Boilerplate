import { isEnum } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SqlBaseEntity } from "../../entity/base-entity";
@Entity()
export class Roles extends SqlBaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  slug: string;
}
