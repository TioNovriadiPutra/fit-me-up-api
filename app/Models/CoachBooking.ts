import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import Coach from "./Coach";
import VenueBooking from "./VenueBooking";

export default class CoachBooking extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime()
  public bookingTime: DateTime;

  @column()
  public duration: number;

  @column()
  public totalPrice: number;

  @column({
    serialize: (value: number) => {
      return Boolean(value);
    },
  })
  public accept: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @column()
  public coachId: number;

  @column()
  public venueBookingId?: number;

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>;

  @belongsTo(() => Coach)
  public coach: BelongsTo<typeof Coach>;

  @belongsTo(() => VenueBooking)
  public venueBooking: BelongsTo<typeof VenueBooking>;
}
