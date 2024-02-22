import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "team_members";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("profile_id")
        .unsigned()
        .references("profiles.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("team_id")
        .unsigned()
        .references("teams.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
