import Database from "@ioc:Adonis/Lucid/Database";
import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { Role } from "App/Enums/Role";

export default class extends BaseSchema {
  protected tableName = "roles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("role_name", 10).notNullable();

      this.defer(async () => {
        await Database.table(this.tableName).multiInsert([
          {
            id: Role.ADMIN,
            role_name: "Admin",
          },
          {
            id: Role.USER,
            role_name: "User",
          },
          {
            id: Role.COACH,
            role_name: "Coach",
          },
          {
            id: Role.VENUE,
            role_name: "Venue",
          },
        ]);
      });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
