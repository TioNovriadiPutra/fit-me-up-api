import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "profiles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("full_name", 50).notNullable();
      table.date("date_birth").notNullable();
      table.integer("active_balance").notNullable().defaultTo(0);
      table
        .timestamp("created_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .timestamp("updated_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("domicile_id")
        .unsigned()
        .references("domiciles.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
