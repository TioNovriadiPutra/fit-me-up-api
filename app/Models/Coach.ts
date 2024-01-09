import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import CoachSchedule from "./CoachSchedule";

export default class Coach extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public bookPricePerHour: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>;

  @hasMany(() => CoachSchedule)
  public schedules: HasMany<typeof CoachSchedule>;
}
