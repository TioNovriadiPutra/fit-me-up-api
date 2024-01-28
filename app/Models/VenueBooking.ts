import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasOne,
  belongsTo,
  column,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import Venue from "./Venue";
import VenueChooseSport from "./VenueChooseSport";
import CoachBooking from "./CoachBooking";
import { Status } from "App/Enums/Status";

export default class VenueBooking extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public playerTotal: number;

  @column.dateTime()
  public bookingTime: DateTime;

  @column()
  public duration: number;

  @column()
  public totalPrice: number;

  @column()
  public status: Status;

  @column()
  public orderId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @column()
  public venueId: number;

  @column()
  public venueChooseSportId: number;

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>;

  @belongsTo(() => Venue)
  public venue: BelongsTo<typeof Venue>;

  @belongsTo(() => VenueChooseSport)
  public venueChooseSport: BelongsTo<typeof VenueChooseSport>;

  @hasOne(() => CoachBooking)
  public coachBooking: HasOne<typeof CoachBooking>;
}
