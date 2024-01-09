import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FavSport from "App/Models/FavSport";
import AddFavSportValidator from "App/Validators/AddFavSportValidator";
import ForbiddenException from "App/Exceptions/ForbiddenException";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import Application from "@ioc:Adonis/Core/Application";

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

      const newFavSport = new FavSport();
      newFavSport.sportName = data.sportName;
      newFavSport.sportIcon = data.sportIcon.clientName;

      await data.sportIcon.move(Application.publicPath("uploads/fav_sports"), {
        name: data.sportIcon.clientName,
        overwrite: true,
      });

      await newFavSport.save();

      return response.created({
        message: "New sport added successfully!",
      });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      } else if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      }
    }
  }
}
