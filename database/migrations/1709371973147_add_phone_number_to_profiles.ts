import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "profiles";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("phone_number", 20).notNullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("phone_number");
    });
  }
}