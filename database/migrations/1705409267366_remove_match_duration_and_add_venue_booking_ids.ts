import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "lfg_matches";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("match_duration");
      table
        .integer("venue_booking_id")
        .unsigned()
        .references("venue_bookings.id")
        .onDelete("SET NULL")
        .nullable();
      table.dropForeign("venue_id");
      table.dropColumn("venue_id");
      table.boolean("status").notNullable().defaultTo(false);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("match_duration").notNullable();
      table.dropForeign("venue_booking_id");
      table.dropColumn("venue_booking_id");
      table
        .integer("venue_id")
        .unsigned()
        .references("venues.id")
        .onDelete("SET NUll")
        .nullable();
      table.dropColumn("status");
    });
  }
}
