import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "venue_bookings";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("accept");
      table
        .enum("status", ["pending", "accept", "decline", "done"])
        .notNullable()
        .defaultTo("pending")
        .alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("accept").notNullable().defaultTo(false);
      table.boolean("status").notNullable().defaultTo(false).alter();
    });
  }
}
