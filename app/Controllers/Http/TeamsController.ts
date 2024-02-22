import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import Cup from "App/Models/Cup";
import Team from "App/Models/Team";

export default class TeamsController {
  public async getNearbyTeams({ response, auth }: HttpContextContract) {
    const teamData = await Team.query()
      .preload("domicile")
      .preload("favSport")
      .preload("members")
      .where("domicile_id", auth.user!.profile.domicile.id);

    return response.ok({ message: "Data fetched!", data: teamData });
  }

  public async joinCup({ response, auth, params }: HttpContextContract) {
    try {
      const cupData = await Cup.findOrFail(params.id);

      await cupData
        .related("participants")
        .attach([auth.user!.profile.teams.id]);

      return response.ok({ message: "Join cup success!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Cup data not found!");
      }
    }
  }
}
