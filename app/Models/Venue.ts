import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Profile from "./Profile";
import VenueSchedule from "./VenueSchedule";
import VenuePhoto from "./VenuePhoto";
import VenueChooseSport from "./VenueChooseSport";

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public venueName: string;

  @column()
  public venueAddress: string;

  @column()
  public venueTimeOpen: string;

  @column()
  public venueTimeClose: string;

  @column()
  public venueDescription: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>;

  @hasMany(() => VenueSchedule)
  public venueSchedules: HasMany<typeof VenueSchedule>;

  @hasMany(() => VenuePhoto)
  public venuePhotos: HasMany<typeof VenuePhoto>;

  @hasMany(() => VenueChooseSport)
  public venueChooseSports: HasMany<typeof VenueChooseSport>;
}
