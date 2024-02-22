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
import Domicile from "./Domicile";
import FavSport from "./FavSport";
import Cup from "./Cup";

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public teamName: string;

  @column()
  public maxMember: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public profileId: number;

  @column()
  public domicileId: number;

  @column()
  public favSportId: number;

  @belongsTo(() => Profile)
  public creator: BelongsTo<typeof Profile>;

  @belongsTo(() => Domicile)
  public domicile: BelongsTo<typeof Domicile>;

  @belongsTo(() => FavSport)
  public favSport: BelongsTo<typeof FavSport>;

  @manyToMany(() => Profile, {
    pivotTable: "team_members",
  })
  public members: ManyToMany<typeof Profile>;

  @manyToMany(() => Cup, {
    pivotTable: "cup_participants",
  })
  public cups: ManyToMany<typeof Cup>;
}
