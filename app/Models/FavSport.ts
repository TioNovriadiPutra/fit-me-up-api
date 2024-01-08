import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";

export default class FavSport extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public sportName: string;

  @column()
  public sportIcon: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Profile, {
    pivotTable: "choose_sports",
  })
  public profiles: ManyToMany<typeof Profile>;
}
