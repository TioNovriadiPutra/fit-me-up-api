import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "coach_bookings";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("accept");
      table
        .enum("status", ["pending", "decline", "accept", "done"])
        .notNullable()
        .defaultTo("pending");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("status");
      table.boolean("accept").notNullable().defaultTo(false);
    });
  }
}
