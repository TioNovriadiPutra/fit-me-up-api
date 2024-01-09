import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "venues";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("venue_name", 45).notNullable();
      table.string("venue_address", 100).notNullable();
      table.time("venue_time_open").notNullable();
      table.time("venue_time_close").notNullable();
      table.text("venue_description", "longtext").notNullable();
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
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
