import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "transactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("nominal").notNullable();
      table.string("transaction_number", 25).notNullable();
      table.timestamp("created_at", { useTz: true });
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
