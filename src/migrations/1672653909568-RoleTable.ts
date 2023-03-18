import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RoleTable1672653909568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          {
            name: "id",
            type: "int4",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "slug",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
      false
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE roles`);
  }
}
