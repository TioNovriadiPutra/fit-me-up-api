import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import generateRandomId from "App/Helpers/GenerateRandomId";

export default class extends BaseSchema {
  protected tableName = "venue_bookings";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string("order_id", 15)
        .notNullable()
        .defaultTo(`#${generateRandomId(14)}`);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("order_id");
    });
  }
}
