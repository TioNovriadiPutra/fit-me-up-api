import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Domicile from "./Domicile";
import FavSport from "./FavSport";

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fullName: string;

  @column.date()
  public dateBirth: DateTime;

  @column()
  public activeBalance: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public userId: number;

  @column()
  public domicileId?: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Domicile)
  public domicile: BelongsTo<typeof Domicile>;

  @manyToMany(() => FavSport, {
    pivotTable: "choose_sports",
  })
  public favSports: ManyToMany<typeof FavSport>;
}
