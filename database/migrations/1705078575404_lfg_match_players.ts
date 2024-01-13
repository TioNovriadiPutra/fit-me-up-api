import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "lfg_match_players";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("profile_id")
        .unsigned()
        .references("profiles.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("lfg_match_id")
        .unsigned()
        .references("lfg_matches.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
