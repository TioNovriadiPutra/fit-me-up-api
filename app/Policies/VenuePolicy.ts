import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import { Role } from "App/Enums/Role";
import User from "App/Models/User";

export default class VenuePolicy extends BasePolicy {
  public async getRequest(user: User) {
    return user.roleId === Role["VENUE"];
  }
}
