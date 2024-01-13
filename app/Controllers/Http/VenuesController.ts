import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Venue from "App/Models/Venue";

export default class VenuesController {
  public async getVenuesByDomicile({ response, params }: HttpContextContract) {
    const venueData = await Venue.query()
      .preload("venuePhotos")
      .preload("venueSchedules")
      .preload("venueChooseSports", (tmp) => {
        tmp.preload("favSport");
      })
      .whereHas("profile", (tmp) => {
        tmp.where("domicile_id", params.id);
      });

    return response.ok({ message: "Data fetched!", data: venueData });
  }
}
