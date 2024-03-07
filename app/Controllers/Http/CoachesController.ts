import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Role } from "App/Enums/Role";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import ForbiddenException from "App/Exceptions/ForbiddenException";
import Coach from "App/Models/Coach";
import CoachBooking from "App/Models/CoachBooking";
import Profile from "App/Models/Profile";
import User from "App/Models/User";
import UpdateCoachProfileValidator from "App/Validators/UpdateCoachProfileValidator";
import Drive from "@ioc:Adonis/Core/Drive";
import Application from "@ioc:Adonis/Core/Application";
import { Status } from "App/Enums/Status";
import Database from "@ioc:Adonis/Lucid/Database";
import CoachSchedule from "App/Models/CoachSchedule";

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

  public async updateCoachProfile({
    request,
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    if (auth.user) {
      try {
        await bouncer.with("CoachPolicy").authorize("update");

        const data = await request.validate(UpdateCoachProfileValidator);

        const userData = await User.findOrFail(auth.user.id);
        userData.email = data.email;

        const profileData = await Profile.findOrFail(auth.user.id);
        profileData.fullName = data.fullName;
        profileData.dateBirth = data.dateBirth;

        if (data.profilePic) {
          if (profileData.profilePic) {
            await Drive.delete(profileData.profilePic);
          }

          profileData.profilePic = data.profilePic.clientName;
          await data.profilePic.move(
            Application.publicPath("uploads/profiles"),
            {
              name: data.profilePic.clientName,
            }
          );
        }

        const coachData = await Coach.findByOrFail("profile_id", auth.user.id);
        coachData.bookPricePerHour = data.bookPricePerHour;

        await Database.rawQuery(
          `DELETE FROM coach_schedules
          WHERE coach_id = ?`,
          [coachData.id]
        );

        for (let i = 0; i < data.schedules.length; i++) {
          const newCoachSchedule = new CoachSchedule();
          newCoachSchedule.scheduleDay = data.schedules[i].scheduleDay;
          newCoachSchedule.scheduleTimeStart =
            data.schedules[i].scheduleTimeStart;
          newCoachSchedule.scheduleTimeEnd = data.schedules[i].scheduleTimeEnd;
          newCoachSchedule.coachId = coachData.id;

          await newCoachSchedule.save();
        }

        await userData.related("profile").save(profileData);
        await profileData.related("coach").save(coachData);

        return response.ok({ message: "Coach profile updated!" });
      } catch (error) {
        if (error.status === 422) {
          throw new CustomValidationException(error.messages);
        } else if (error.status === 404) {
          throw new DataNotFoundException("Profile data not found!");
        } else if (error.status === 403) {
          throw new ForbiddenException();
        }
      }
    }
  }

  public async getPendingCoachRequest({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("CoachPolicy").authorize("getRequest");

      const coachBookingData = await CoachBooking.query()
        .preload("venueBooking", (tmp) => {
          tmp
            .preload("venue", (tmp) => {
              tmp.preload("profile", (tmp) => {
                tmp.preload("domicile");
              });
            })
            .preload("venueChooseSport", (tmp) => {
              tmp.preload("favSport");
            });
        })
        .whereHas("coach", (tmp) => {
          tmp.where("profile_id", auth.user!.id);
        })
        .andWhere("status", Status["PENDING"])
        .andWhereNotNull("venue_booking_id");

      return response.ok({
        message: "Data fetched!",
        data: coachBookingData,
      });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async acceptCoachRequest({
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      const coachBookingData = await CoachBooking.findOrFail(params.id);

      const profileData = await Profile.query()
        .whereHas("coach", (tmp) => {
          tmp.where("id", coachBookingData.coachId);
        })
        .firstOrFail();

      await bouncer.with("CoachPolicy").authorize("status", profileData);

      coachBookingData.status = Status["ACCEPT"];

      await coachBookingData.save();

      return response.ok({ message: "Coach request accepted!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Coach Booking data not found!");
      } else if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async declineCoachRequest({
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      const coachBookingData = await CoachBooking.findOrFail(params.id);

      const profileData = await Profile.query()
        .whereHas("coach", (tmp) => {
          tmp.where("id", coachBookingData.coachId);
        })
        .firstOrFail();

      await bouncer.with("CoachPolicy").authorize("status", profileData);

      coachBookingData.status = Status["DECLINE"];

      await coachBookingData.save();

      return response.ok({ message: "Coach request declined!" });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Coach Booking data not found!");
      } else if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async getOngoingCoachRequest({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("CoachPolicy").authorize("getRequest");

      const coachBookingData = await CoachBooking.query()
        .preload("venueBooking", (tmp) => {
          tmp
            .preload("venue", (tmp) => {
              tmp.preload("profile", (tmp) => {
                tmp.preload("domicile");
              });
            })
            .preload("venueChooseSport", (tmp) => {
              tmp.preload("favSport");
            });
        })
        .whereHas("coach", (tmp) => {
          tmp.where("profile_id", auth.user!.id);
        })
        .andWhere("status", Status["ACCEPT"]);

      return response.ok({
        message: "Data fetched!",
        data: coachBookingData,
      });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }

  public async showCoachRequestDetail({
    response,
    params,
  }: HttpContextContract) {
    try {
      const coachBookingData = await CoachBooking.query()
        .preload("venueBooking", (tmp) => {
          tmp.preload("venue").preload("venueChooseSport", (tmp) => {
            tmp.preload("favSport");
          });
        })
        .preload("profile")
        .where("id", params.id)
        .firstOrFail();

      return response.ok({ message: "Data fetched!", data: coachBookingData });
    } catch (error) {
      if (error.status === 404) {
        throw new DataNotFoundException("Coach Booking data not found!");
      }
    }
  }

  public async getCoachRequestHistory({
    response,
    auth,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("CoachPolicy").authorize("getRequest");

      const coachBookingData = await CoachBooking.query()
        .preload("venueBooking", (tmp) => {
          tmp
            .preload("venue", (tmp) => {
              tmp.preload("profile", (tmp) => {
                tmp.preload("domicile");
              });
            })
            .preload("venueChooseSport", (tmp) => {
              tmp.preload("favSport");
            });
        })
        .whereHas("coach", (tmp) => {
          tmp.where("profile_id", auth.user!.id);
        })
        .andWhereNot("status", Status["PENDING"])
        .andWhereNotNull("venue_booking_id");

      return response.ok({
        message: "Data fetched!",
        data: coachBookingData,
      });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      }
    }
  }
}
