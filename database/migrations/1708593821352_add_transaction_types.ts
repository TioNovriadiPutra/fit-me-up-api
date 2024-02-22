import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "transactions";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum("transaction_type", ["topUp", "withdraw"]).notNullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("transaction_type");
    });
  }
}
