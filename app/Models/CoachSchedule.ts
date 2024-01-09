import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Coach from "./Coach";

export default class CoachSchedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public scheduleDay: number;

  @column()
  public scheduleTimeStart: string;

  @column()
  public scheduleTimeEnd: string;

  @column({
    serialize: (value: number) => {
      return Boolean(value);
    },
  })
  public bookStatus: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public coachId: number;

  @belongsTo(() => Coach)
  public coach: BelongsTo<typeof Coach>;
}
