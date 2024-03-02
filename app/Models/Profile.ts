import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  hasOne,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Domicile from "./Domicile";
import FavSport from "./FavSport";
import Coach from "./Coach";
import Venue from "./Venue";
import LfgMatch from "./LfgMatch";
import CoachBooking from "./CoachBooking";
import VenueBooking from "./VenueBooking";
import Cup from "./Cup";
import Transaction from "./Transaction";
import Team from "./Team";
import Bank from "./Bank";

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fullName: string;

  @column.date()
  public dateBirth: DateTime;

  @column()
  public activeBalance: number;

  @column()
  public phoneNumber: string;

  @column()
  public profilePic?: string;

  @column()
  public bankNumber?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public userId: number;

  @column()
  public domicileId?: number;

  @column()
  public bankId?: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Domicile)
  public domicile: BelongsTo<typeof Domicile>;

  @manyToMany(() => FavSport, {
    pivotTable: "choose_sports",
  })
  public favSports: ManyToMany<typeof FavSport>;

  @hasOne(() => Coach)
  public coach: HasOne<typeof Coach>;

  @hasMany(() => Venue)
  public venues: HasMany<typeof Venue>;

  @hasMany(() => LfgMatch)
  public lfgMatches: HasMany<typeof LfgMatch>;

  @hasMany(() => CoachBooking)
  public coachBookings: HasMany<typeof CoachBooking>;

  @hasMany(() => VenueBooking)
  public venueBookings: HasMany<typeof VenueBooking>;

  @hasMany(() => Cup)
  public cups: HasMany<typeof Cup>;

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>;

  @hasOne(() => Team)
  public teams: HasOne<typeof Team>;

  @manyToMany(() => Team, {
    pivotTable: "team_members",
  })
  public members: ManyToMany<typeof Team>;

  @belongsTo(() => Bank)
  declare bank: BelongsTo<typeof Bank>;
}
