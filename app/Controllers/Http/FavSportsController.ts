import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FavSport from "App/Models/FavSport";
import AddFavSportValidator from "App/Validators/AddFavSportValidator";

export default class FavSportsController {
  public async getAllFavSports({ response }: HttpContextContract) {
    const favSportData = await FavSport.all();

    return response.ok({ message: "Data fetched!", data: favSportData });
  }

  public async addFavSport({
    request,
    response,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("FavSportPolicy").authorize("create");

      const data = await request.validate(AddFavSportValidator);
    } catch (error) {
      return response.ok(error);
    }
  }
}
