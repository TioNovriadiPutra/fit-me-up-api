import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Venue from "./Venue";

export default class VenuePhoto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public photoUrl: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public venueId: number;

  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>;
}
