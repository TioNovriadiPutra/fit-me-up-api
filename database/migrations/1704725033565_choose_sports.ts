import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "choose_sports";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("fav_sport_id")
        .unsigned()
        .references("fav_sports.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("profile_id")
        .unsigned()
        .references("profiles.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
