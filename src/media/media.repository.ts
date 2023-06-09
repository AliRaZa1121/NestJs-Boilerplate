import { EntityRepository, Repository } from "typeorm";
import { Media } from "./entities/media.entity";

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {
  constructor() {
    super();
  }
}
