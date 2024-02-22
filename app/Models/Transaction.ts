import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nominal: number;

  @column()
  public transactionNumber: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public profileId: number;

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>;
}
