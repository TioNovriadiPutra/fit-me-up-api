import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "cups";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("cup_name", 45).notNullable();
      table.integer("max_team").notNullable();
      table.datetime("cup_time").notNullable();
      table.integer("price").notNullable();
      table.string("thumbnail", 255).notNullable();
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
        .onDelete("CASCADE");
      table
        .integer("venue_id")
        .unsigned()
        .references("venues.id")
        .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
