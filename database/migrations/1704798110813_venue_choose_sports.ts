import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "venue_choose_sports";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("venue_max_capacity").notNullable();
      table.integer("venue_pricing").notNullable();
      table
        .timestamp("created_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .integer("fav_sport_id")
        .unsigned()
        .references("fav_sports.id")
        .onDelete("SET NULL")
        .nullable();
      table
        .integer("venue_id")
        .unsigned()
        .references("venues.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
