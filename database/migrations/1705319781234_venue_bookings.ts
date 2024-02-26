import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "venue_bookings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("player_total").notNullable();
      table.datetime("booking_time").notNullable();
      table.integer("duration").notNullable();
      table.integer("total_price").notNullable();
      table
        .enum("status", ["pending", "decline", "accept", "done"])
        .notNullable()
        .defaultTo("pending");
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
        .integer("venue_id")
        .unsigned()
        .references("venues.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("venue_choose_sport_id")
        .unsigned()
        .references("venue_choose_sports.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
