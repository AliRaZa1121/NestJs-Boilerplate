import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export class SqlBaseEntity extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
