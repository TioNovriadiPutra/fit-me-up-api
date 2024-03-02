import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";

export default class Bank extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public bankName: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Profile)
  public profiles: HasMany<typeof Profile>;
}
