import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import { Role } from "App/Enums/Role";
import Profile from "App/Models/Profile";
import User from "App/Models/User";

export default class CoachPolicy extends BasePolicy {
  public async getRequest(user: User) {
    return user.roleId === Role["COACH"] || user.roleId === Role["ADMIN"];
  }

  public async update(user: User) {
    return user.roleId === Role["COACH"];
  }

  public async status(user: User, profile: Profile) {
    return user.id === profile.userId;
  }
}
