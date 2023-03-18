import { MediaType } from "src/utilities/enums";
import { Column, Entity } from "typeorm";
import { SqlBaseEntity } from "../../entity/base-entity";

@Entity()
export class Media extends SqlBaseEntity {
  @Column({
    type: "enum",
    enum: MediaType,
    default: MediaType.FILE,
  })
  type: MediaType | string;

  @Column({ type: "varchar", length: 255, nullable: true })
  path: string;
}
