import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Role } from "App/Enums/Role";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import Profile from "App/Models/Profile";

export default class CoachesController {
  public async getAvailableCoaches({ response }: HttpContextContract) {
    const coachData = await Profile.query()
      .preload("domicile")
      .preload("favSports")
      .whereHas("user", (tmp) => {
        tmp.where("role_id", Role["COACH"]);
      });

    return response.ok({ message: "Data fetched!", data: coachData });
  }

  public async showCoachDetail({ response, params }: HttpContextContract) {
    try {
      const coachData = await Profile.query()
        .preload("domicile")
        .preload("favSports")
        .preload("coach", (tmp) => {
          tmp.preload("schedules");
        })
        .where("id", params.id)
        .andWhereHas("user", (tmp) => {
          tmp.where("role_id", Role["COACH"]);
        })
        .firstOrFail();

      return response.ok({ message: "Data fetched!", data: coachData });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Coach data not found!");
      }
    }
  }
}
