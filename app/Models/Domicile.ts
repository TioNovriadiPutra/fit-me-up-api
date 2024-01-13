import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import LfgMatch from "./LfgMatch";

export default class Domicile extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public domicileName: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Profile)
  public profiles: HasMany<typeof Profile>;

  @hasMany(() => LfgMatch)
  public lfgMatches: HasMany<typeof LfgMatch>;
}
