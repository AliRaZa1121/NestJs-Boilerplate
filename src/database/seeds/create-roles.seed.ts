import { Roles } from "src/roles/entities/roles.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Roles)
      .values([
        {
          name: "Admin",
          slug: "admin",
        },
        {
          name: "User",
          slug: "user",
        },
      ])
      .execute();
  }
}
