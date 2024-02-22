import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "teams";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("team_name", 45).notNullable();
      table
        .timestamp("created_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .timestamp("updated_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .integer("profile_id")
        .unsigned()
        .references("profiles.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("domicile_id")
        .unsigned()
        .references("domiciles.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("fav_sport_id")
        .unsigned()
        .references("fac_sports.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
