import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import FavSport from "./FavSport";
import Domicile from "./Domicile";
import VenueBooking from "./VenueBooking";

export default class LfgMatch extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public matchName: string;

  @column.dateTime()
  public matchTime: DateTime;

  @column()
  public matchMinPlayer: number;

  @column({
    serialize: (value: number) => {
      return Boolean(value);
    },
  })
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @column()
  public favSportId?: number;

  @column()
  public domicileId: number;

  @column()
  public venueBookingId?: number;

  @belongsTo(() => Profile)
  public gm: BelongsTo<typeof Profile>;

  @belongsTo(() => FavSport)
  public sportType: BelongsTo<typeof FavSport>;

  @belongsTo(() => Domicile)
  public domicile: BelongsTo<typeof Domicile>;

  @manyToMany(() => Profile, {
    pivotTable: "lfg_match_players",
  })
  public players: ManyToMany<typeof Profile>;

  @belongsTo(() => VenueBooking)
  public venueBooking: BelongsTo<typeof VenueBooking>;
}
