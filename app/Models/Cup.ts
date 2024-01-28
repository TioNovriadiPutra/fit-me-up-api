import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import Venue from "./Venue";

export default class Cup extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cupName: string;

  @column()
  public maxTeam: number;

  @column.dateTime()
  public cupTime: DateTime;

  @column()
  public prize: number;

  @column()
  public thumbnail: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @column()
  public venueId: number;

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>;

  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>;
}
