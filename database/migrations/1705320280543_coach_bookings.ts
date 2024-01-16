import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "coach_bookings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.datetime("booking_time").notNullable();
      table.integer("duration").notNullable();
      table.integer("total_price").notNullable();
      table.boolean("accept").notNullable().defaultTo(false);
      table
        .timestamp("created_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .timestamp("updated_at", { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .integer("profile_id")
        .unsigned()
        .references("profiles.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("coach_id")
        .unsigned()
        .references("coaches.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("venue_booking_id")
        .unsigned()
        .references("venue_bookings.id")
        .onDelete("SET NULL")
        .nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
