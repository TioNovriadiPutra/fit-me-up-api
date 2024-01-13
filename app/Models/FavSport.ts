import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import VenueChooseSport from "./VenueChooseSport";
import LfgMatch from "./LfgMatch";

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

  @hasMany(() => VenueChooseSport)
  public venueChooseSports: HasMany<typeof VenueChooseSport>;

  @hasMany(() => LfgMatch)
  public lfgMatches: HasMany<typeof LfgMatch>;
}
