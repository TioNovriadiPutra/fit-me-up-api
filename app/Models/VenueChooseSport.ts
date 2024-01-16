import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import FavSport from "./FavSport";
import Venue from "./Venue";
import VenueBooking from "./VenueBooking";

export default class VenueChooseSport extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public venueMaxCapacity: number;

  @column()
  public venuePricing: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public favSportId?: number;

  @column()
  public venueId: number;

  @belongsTo(() => FavSport)
  public favSport: BelongsTo<typeof FavSport>;

  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>;

  @hasMany(() => VenueBooking)
  public venueBookings: HasMany<typeof VenueBooking>;
}
