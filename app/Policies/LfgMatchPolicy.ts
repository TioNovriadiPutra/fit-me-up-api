import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import LfgMatch from "App/Models/LfgMatch";
import User from "App/Models/User";

export default class LfgMatchPolicy extends BasePolicy {
  public async delete(user: User, lfgMatch: LfgMatch) {
    return user.id === lfgMatch.profileId;
  }
}
