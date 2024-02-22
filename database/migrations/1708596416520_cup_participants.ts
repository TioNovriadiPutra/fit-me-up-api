import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "cup_participants";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("cup_id")
        .unsigned()
        .references("cups.id")
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
