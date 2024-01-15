import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import ForbiddenException from "App/Exceptions/ForbiddenException";
import LfgMatch from "App/Models/LfgMatch";
import Profile from "App/Models/Profile";
import AddLfgMatchValidator from "App/Validators/AddLfgMatchValidator";
import { DateTime } from "luxon";

export default class LfgMatchesController {
  public async showLfgMatchPlayers({ response, params }: HttpContextContract) {
    try {
      const lfgMatchData = await LfgMatch.query()
        .preload("gm")
        .preload("players")
        .where("id", params.id)
        .firstOrFail();

      return response.ok({ message: "Data fetched!", data: lfgMatchData });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("LFG Match data not found!");
      }
    }
  }

  public async addLfgMatch({ request, response, auth }: HttpContextContract) {
    if (auth.user) {
      try {
        const data = await request.validate(AddLfgMatchValidator);

        const profileData = await Profile.findOrFail(auth.user.id);

        const newLfgMatch = new LfgMatch();
        newLfgMatch.matchName = data.matchName;
        newLfgMatch.matchTime = DateTime.fromFormat(
          data.matchTime,
          "yyyy-MM-dd HH:mm:ss"
        );
        newLfgMatch.matchMinPlayer = data.matchMinPlayer;
        newLfgMatch.domicileId = data.domicileId;
        newLfgMatch.favSportId = data.favSportId;
        newLfgMatch.profileId = profileData.id;

        await newLfgMatch.save();
        await newLfgMatch.related("players").attach([auth.user.id]);

        return response.created({ message: "LFG Match added successfully!" });
      } catch (error) {
        if (error.status === 422) {
          throw new CustomValidationException(error.messages);
        } else {
          console.log(error);
        }
      }
    }
  }

  public async deleteLfgMatch({
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      const lfgMatchData = await LfgMatch.findOrFail(params.id);

      await bouncer.with("LfgMatchPolicy").authorize("delete", lfgMatchData);

      await lfgMatchData.delete();

      return response.ok({ message: "LFG Match canceled!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("LFG Match data not found!");
      } else if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }
}
