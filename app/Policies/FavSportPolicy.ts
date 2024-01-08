import { BasePolicy } from "@ioc:Adonis/Addons/Bouncer";
import { Role } from "App/Enums/Role";
import User from "App/Models/User";

export default class FavSportPolicy extends BasePolicy {
  public async create(user: User) {
    return user.roleId === Role["ADMIN"];
  }

  public async update(user: User) {
    return user.roleId === Role["ADMIN"];
  }

  public async delete(user: User) {
    return user.roleId === Role["ADMIN"];
  }
}
