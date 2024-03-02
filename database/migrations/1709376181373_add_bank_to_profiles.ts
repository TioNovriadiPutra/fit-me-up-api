import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "profiles";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("bank_id")
        .unsigned()
        .references("banks.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign("bank_id");
      table.dropColumn("bank_id");
    });
  }
}
