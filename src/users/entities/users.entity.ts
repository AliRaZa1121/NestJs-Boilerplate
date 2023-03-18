import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  OneToOne,
  JoinColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SqlBaseEntity } from 'src/model/sql.entity';
import { UserRoles, UserStatus } from 'src/constant/enum';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity extends SqlBaseEntity {
  @Column({ default: null, nullable: true })
  name: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  @Column({ default: null, nullable: true })
  @Exclude()
  password: string;

  @Column({ name: 'email' })
  @Index({ unique: true })
  email: string;

  @Column({ name: 'phone', default: null, nullable: true })
  @Index({ unique: true })
  phone: number;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.User })
  role: UserRoles;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Unverified })
  status: UserStatus;
}
