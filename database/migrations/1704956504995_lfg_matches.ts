import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "lfg_matches";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("match_name", 45).notNullable();
      table.datetime("match_time").notNullable();
      table.integer("match_duration").nullable();
      table.integer("match_min_player").notNullable();
      table
        .timestamp("created_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .timestamp("updated_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .integer("venue_id")
        .unsigned()
        .references("venues.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("profile_id")
        .unsigned()
        .references("profiles.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("fav_sport_id")
        .unsigned()
        .references("fav_sports.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("domicile_id")
        .unsigned()
        .references("domiciles.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
