import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import { SqlBaseEntity } from 'src/model/sql.entity';

@Entity('verification')
export class VerificationEntity extends SqlBaseEntity {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'code' })
  code: string;
}
