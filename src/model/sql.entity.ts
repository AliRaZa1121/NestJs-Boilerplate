import { BaseModel } from './base.entity';
import {
    AfterInsert,
    AfterLoad,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class SqlBaseEntity extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @DeleteDateColumn({ default: null })
    public deleted_at: Date;

    @AfterInsert()
    castIdToNumber() {
        this.id = typeof this.id === 'string' ? parseInt(this.id) : this.id;
    }
}
