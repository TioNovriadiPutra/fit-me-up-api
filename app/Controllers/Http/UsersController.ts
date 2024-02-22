import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import ForbiddenException from "App/Exceptions/ForbiddenException";
import generateRandomId from "App/Helpers/GenerateRandomId";
import CoachBooking from "App/Models/CoachBooking";
import LfgMatch from "App/Models/LfgMatch";
import Profile from "App/Models/Profile";
import Transaction from "App/Models/Transaction";
import VenueBooking from "App/Models/VenueBooking";
import BookCoachValidator from "App/Validators/BookCoachValidator";
import BookVenueValidator from "App/Validators/BookVenueValidator";
import TopUpValidator from "App/Validators/TopUpValidator";
import { DateTime } from "luxon";

export default class UsersController {
  public async bookCoach({
    request,
    response,
    params,
    auth,
  }: HttpContextContract) {
    if (auth.user) {
      try {
        const data = await request.validate(BookCoachValidator);

        const coachProfileData = await Profile.query()
          .whereHas("coach", (tmp) => {
            tmp.where("id", params.id);
          })
          .firstOrFail();
        coachProfileData.activeBalance =
          coachProfileData.activeBalance + data.totalPrice;

        const newCoachBooking = new CoachBooking();
        newCoachBooking.bookingTime = DateTime.fromISO(data.bookingTime);
        newCoachBooking.duration = data.duration;
        newCoachBooking.totalPrice = data.totalPrice;
        newCoachBooking.profileId = auth.user.id;
        newCoachBooking.coachId = params.id;

        await coachProfileData.related("coachBookings").save(newCoachBooking);

        return response.created({
          message: "Coach booked successfully!",
          coachBookingId: newCoachBooking.id,
        });
      } catch (error) {
        if (error.status === 422) {
          throw new CustomValidationException(error.messages);
        } else if (error.status === 404) {
          throw new DataNotFoundException("Coach data not found!");
        }
      }
    }
  }

  public async bookVenue({
    request,
    response,
    auth,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      const data = await request.validate(BookVenueValidator);

      if (data.lfgMatchId) {
        const lfgMatchData = await LfgMatch.findOrFail(data.lfgMatchId);

        await bouncer.with("LfgMatchPolicy").authorize("gm", lfgMatchData);
      }

      const profileData = await Profile.findByOrFail("user_id", auth.user!.id);
      profileData.activeBalance = profileData.activeBalance - data.totalPrice;

      await profileData.save();

      const newVenueBooking = new VenueBooking();
      newVenueBooking.playerTotal = data.playerTotal;
      newVenueBooking.bookingTime = DateTime.fromISO(data.bookingTime);
      newVenueBooking.duration = data.duration;
      newVenueBooking.totalPrice = data.totalPrice;
      newVenueBooking.profileId = profileData.id;
      newVenueBooking.venueId = params.id;
      newVenueBooking.venueChooseSportId = data.venueChooseSportId;
      newVenueBooking.orderId = `#${generateRandomId(14)}`;

      await newVenueBooking.save();

      if (data.coachBookingId) {
        const coachBookingData = await CoachBooking.findOrFail(
          data.coachBookingId
        );
        coachBookingData.venueBookingId = newVenueBooking.id;

        await coachBookingData.save();
      } else if (data.lfgMatchId) {
        const lfgMatchData = await LfgMatch.findOrFail(data.lfgMatchId);
        lfgMatchData.venueBookingId = newVenueBooking.id;

        await lfgMatchData.save();
      }

      return response.created({
        message: "Venue booked successfully!",
      });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      } else if (error.status === 404) {
        throw new DataNotFoundException("Data not found!");
      } else if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async getActiveBooking({ response, auth }: HttpContextContract) {
    if (auth.user) {
      const activeBookingData = await VenueBooking.query()
        .preload("venue", (tmp) => {
          tmp.preload("profile", (tmp) => {
            tmp.preload("domicile");
          });
          tmp.preload("venuePhotos");
        })
        .preload("venueChooseSport")
        .where("profile_id", auth.user?.id)
        .andWhere("status", false)
        .andWhere("accept", true);

      return response.ok({ message: "Data fetched!", data: activeBookingData });
    }
  }

  public async getHistoryBooking({ response, auth }: HttpContextContract) {
    if (auth.user) {
      const historyBookingData = await VenueBooking.query()
        .preload("venue", (tmp) => {
          tmp.preload("profile", (tmp) => {
            tmp.preload("domicile");
          });
          tmp.preload("venuePhotos");
        })
        .preload("venueChooseSport", (tmp) => {
          tmp.preload("favSport");
        })
        .where("profile_id", auth.user?.id);

      return response.ok({
        message: "Data fetched!",
        data: historyBookingData,
      });
    }
  }

  public async showBookingDetail({ response, params }: HttpContextContract) {
    try {
      const bookingData = await VenueBooking.query()
        .preload("venue", (tmp) => {
          tmp.preload("profile", (tmp) => {
            tmp.preload("domicile");
          });
          tmp.preload("venuePhotos");
        })
        .preload("venueChooseSport", (tmp) => {
          tmp.preload("favSport");
        })
        .preload("coachBooking", (tmp) => {
          tmp.preload("coach", (tmp) => {
            tmp.preload("profile");
          });
        })
        .where("id", params.id)
        .firstOrFail();

      return response.ok({ message: "Data fetched!", data: bookingData });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Venue Booking data not found!");
      }
    }
  }

  public async joinLfgMatch({ response, params, auth }: HttpContextContract) {
    if (auth.user) {
      try {
        const lfgMatchData = await LfgMatch.findOrFail(params.id);

        await lfgMatchData.related("players").attach([auth.user.id]);

        return response.created({ message: "You join LFG Match!" });
      } catch (error) {
        if (error.status === 404) {
          throw new DataNotFoundException("LFG Match data not found!");
        }
      }
    }
  }

  public async quitLfgMatch({ response, params, auth }: HttpContextContract) {
    if (auth.user) {
      try {
        const lfgMatchData = await LfgMatch.findOrFail(params.id);

        await lfgMatchData.related("players").detach([auth.user.id]);

        return response.created({ message: "You quit LFG Match!" });
      } catch (error) {
        if (error.status === 404) {
          throw new DataNotFoundException("LFG Match data not found!");
        }
      }
    }
  }

  public async topUp({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(TopUpValidator);

      const profileData = await Profile.findByOrFail("user_id", auth.user!.id);
      profileData.activeBalance = profileData.activeBalance + data.nominal;

      const newTransaction = new Transaction();
      newTransaction.nominal = data.nominal;
      newTransaction.transactionNumber = generateRandomId(22);
      newTransaction.transactionType = "topUp";
      newTransaction.profileId = profileData.id;

      await profileData.save();
      await newTransaction.save();

      return response.ok({
        message: "Top up success!",
        data: profileData.activeBalance,
      });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      } else if (error.status === 404) {
        throw new DataNotFoundException("Profile data not found!");
      }
    }
  }

  public async withdraw({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(TopUpValidator);

      const profileData = await Profile.findByOrFail("user_id", auth.user!.id);
      profileData.activeBalance = profileData.activeBalance - data.nominal;

      const newTransaction = new Transaction();
      newTransaction.nominal = data.nominal;
      newTransaction.transactionNumber = generateRandomId(22);
      newTransaction.transactionType = "withdraw";
      newTransaction.profileId = profileData.id;

      await profileData.save();
      await newTransaction.save();

      return response.ok({
        message: "Withdraw success!",
        data: profileData.activeBalance,
      });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      } else if (error.status === 404) {
        throw new DataNotFoundException("Profile data not found!");
      }
    }
  }
}
