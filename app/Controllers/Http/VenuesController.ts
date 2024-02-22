import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Status } from "App/Enums/Status";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import ForbiddenException from "App/Exceptions/ForbiddenException";
import Cup from "App/Models/Cup";
import Profile from "App/Models/Profile";
import Venue from "App/Models/Venue";
import VenueBooking from "App/Models/VenueBooking";
import AddCupValidator from "App/Validators/AddCupValidator";
import { DateTime } from "luxon";
import Application from "@ioc:Adonis/Core/Application";
import CustomValidationException from "App/Exceptions/CustomValidationException";

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

  public async getPendingVenueRequest({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("VenuePolicy").authorize("getRequest");

      const venueBookingData = await VenueBooking.query()
        .preload("venueChooseSport", (tmp) => {
          tmp.preload("favSport");
        })
        .whereHas("venue", (tmp) => {
          tmp.whereHas("profile", (tmp) => {
            tmp.where("user_id", auth.user!.id);
          });
        })
        .andWhere("status", Status["PENDING"]);

      return response.ok({ message: "Data fetched!", data: venueBookingData });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async showVenueRequestDetail({
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("VenuePolicy").authorize("getRequest");

      const venueBookingData = await VenueBooking.query()
        .preload("venue", (tmp) => {
          tmp.preload("venuePhotos");
        })
        .preload("profile")
        .preload("venueChooseSport", (tmp) => {
          tmp.preload("favSport");
        })
        .where("id", params.id)
        .firstOrFail();

      return response.ok({ message: "Data fetched!", data: venueBookingData });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Venue Booking data not found!");
      } else if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async acceptVenueRequest({
    response,
    params,
    auth,
  }: HttpContextContract) {
    try {
      const venueBookingData = await VenueBooking.query()
        .where("id", params.id)
        .andWhereHas("venue", (tmp) => {
          tmp.whereHas("profile", (tmp) => {
            tmp.where("user_id", auth.user!.id);
          });
        })
        .firstOrFail();
      const profileData = await Profile.findByOrFail("user_id", auth.user!.id);

      venueBookingData.status = Status["ACCEPT"];

      profileData.activeBalance =
        profileData.activeBalance + venueBookingData.totalPrice;

      await venueBookingData.save();
      await profileData.save();

      return response.ok({ message: "Venue Booking accepted!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException(
          "Venue Booking and Profile data not found!"
        );
      }
    }
  }

  public async declineVenueRequest({
    response,
    params,
    auth,
  }: HttpContextContract) {
    try {
      const venueBookingData = await VenueBooking.query()
        .where("id", params.id)
        .andWhereHas("venue", (tmp) => {
          tmp.whereHas("profile", (tmp) => {
            tmp.where("user_id", auth.user!.id);
          });
        })
        .firstOrFail();
      const profileData = await Profile.findByOrFail(
        "user_id",
        venueBookingData.profileId
      );

      venueBookingData.status = Status["DECLINE"];

      profileData.activeBalance =
        profileData.activeBalance + venueBookingData.totalPrice;

      await venueBookingData.save();
      await profileData.save();

      return response.ok({ message: "Venue Booking declined!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException(
          "Venue Booking and Profile data not found!"
        );
      }
    }
  }

  public async getOngoingVenueRequest({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("VenuePolicy").authorize("getRequest");

      const venueBookingData = await VenueBooking.query()
        .preload("venueChooseSport", (tmp) => {
          tmp.preload("favSport");
        })
        .whereHas("venue", (tmp) => {
          tmp.whereHas("profile", (tmp) => {
            tmp.where("user_id", auth.user!.id);
          });
        })
        .andWhere("status", Status["ACCEPT"]);

      return response.ok({
        message: "Data fetched!",
        data: venueBookingData,
      });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async getVenueRequestHistory({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("VenuePolicy").authorize("getRequest");

      const venueBookingData = await VenueBooking.query()
        .preload("venueChooseSport", (tmp) => {
          tmp.preload("favSport");
        })
        .whereHas("venue", (tmp) => {
          tmp.whereHas("profile", (tmp) => {
            tmp.where("user_id", auth.user!.id);
          });
        })
        .andWhere("status", Status["DONE"])
        .orWhere("status", Status["DECLINE"]);

      return response.ok({ message: "Data fetched!", data: venueBookingData });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async getOwnerVenueList({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("VenuePolicy").authorize("getRequest");

      const venueData = await Venue.query().whereHas("profile", (tmp) => {
        tmp.where("user_id", auth.user!.id);
      });

      return response.ok({ message: "Data fetched!", data: venueData });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async showVenueDetail({
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("VenuePolicy").authorize("getRequest");

      const venueData = await Venue.query()
        .preload("venueChooseSports", (tmp) => {
          tmp.preload("favSport");
        })
        .preload("venuePhotos")
        .preload("venueSchedules")
        .where("id", params.id)
        .firstOrFail();

      return response.ok({ message: "Data fetched!", data: venueData });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      } else if (error.status === 404) {
        throw new DataNotFoundException("Venue data not found!");
      }
    }
  }

  public async addCup({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(AddCupValidator);

      const newCup = new Cup();
      newCup.cupName = data.cupName;
      newCup.maxTeam = data.cupMaxTeam;
      newCup.cupTime = DateTime.fromISO(data.cupDateTime);
      newCup.prize = data.cupPrize;
      newCup.thumbnail = data.cupThumbnail.clientName;
      newCup.profileId = auth.user!.profile.id;
      newCup.venueId = data.venueId;

      await data.cupThumbnail.move(Application.publicPath("uploads/cups"), {
        name: data.cupThumbnail.clientName,
      });

      return response.created({ message: "Cup added successfully!" });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      }
    }
  }
}
