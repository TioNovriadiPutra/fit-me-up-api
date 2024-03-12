import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import Cup from "App/Models/Cup";
import Team from "App/Models/Team";
import User from "App/Models/User";

export default class TeamsController {
  public async getNearbyTeams({ response, auth }: HttpContextContract) {
    const userData = await User.query()
      .preload("profile")
      .where("id", auth.user!.id)
      .firstOrFail();

    const teamData = await Team.query()
      .preload("domicile")
      .preload("favSport")
      .preload("members")
      .where("domicile_id", userData.profile.domicileId!);

    return response.ok({ message: "Data fetched!", data: teamData });
  }

  public async joinCup({ response, auth, params }: HttpContextContract) {
    try {
      const cupData = await Cup.findOrFail(params.id);

      const userData = await User.query()
        .preload("profile", (tmp) => {
          tmp.preload("teams");
        })
        .where("id", auth.user!.id)
        .firstOrFail();

      await cupData.related("participants").attach([userData.profile.teams.id]);

      return response.ok({ message: "Join cup success!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Cup data not found!");
      }
    }
  }
}
