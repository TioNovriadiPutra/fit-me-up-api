import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "teams";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("max_member").notNullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("max_member");
    });
  }
}
