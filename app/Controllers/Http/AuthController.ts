import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Role } from "App/Enums/Role";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import InvalidCredentialException from "App/Exceptions/InvalidCredentialException";
import Coach from "App/Models/Coach";
import CoachSchedule from "App/Models/CoachSchedule";
import Profile from "App/Models/Profile";
import User from "App/Models/User";
import Venue from "App/Models/Venue";
import VenuePhoto from "App/Models/VenuePhoto";
import VenueSchedule from "App/Models/VenueSchedule";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterCoachValidator from "App/Validators/RegisterCoachValidator";
import RegisterUserValidator from "App/Validators/RegisterUserValidator";
import RegisterValidator from "App/Validators/RegisterValidator";
import RegisterVenueValidator from "App/Validators/RegisterVenueValidator";
import Application from "@ioc:Adonis/Core/Application";
import VenueChooseSport from "App/Models/VenueChooseSport";

export default class AuthController {
  public async registerAdmin({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterValidator);

      const newUser = new User();
      newUser.email = data.email;
      newUser.password = data.password;
      newUser.roleId = Role["ADMIN"];

      const newProfile = new Profile();
      newProfile.fullName = data.fullName;
      newProfile.dateBirth = data.dateBirth;

      await newUser.related("profile").save(newProfile);

      return response.created({ message: "Registration success!" });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      }
    }
  }

  public async registerUser({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterUserValidator);

      const newUser = new User();
      newUser.email = data.email;
      newUser.password = data.password;
      newUser.roleId = Role["USER"];

      const newProfile = new Profile();
      newProfile.fullName = data.fullName;
      newProfile.dateBirth = data.dateBirth;
      newProfile.domicileId = data.domicileId;

      await newUser.related("profile").save(newProfile);

      await newProfile.related("favSports").attach(data.favSportIds);

      return response.created({ message: "Registration success!" });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      }
    }
  }

  public async registerCoach({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterCoachValidator);

      const newUser = new User();
      newUser.email = data.email;
      newUser.password = data.password;
      newUser.roleId = Role["COACH"];

      const newProfile = new Profile();
      newProfile.fullName = data.fullName;
      newProfile.dateBirth = data.dateBirth;

      const newCoach = new Coach();

      await newUser.related("profile").save(newProfile);
      await newProfile.related("coach").save(newCoach);

      for (let i = 0; i < data.schedules.length; i++) {
        const newCoachSchedule = new CoachSchedule();
        newCoachSchedule.scheduleDay = data.schedules[i].scheduleDay;
        newCoachSchedule.scheduleTimeStart =
          data.schedules[i].scheduleTimeStart;
        newCoachSchedule.scheduleTimeEnd = data.schedules[i].scheduleTimeEnd;
        newCoachSchedule.coachId = newCoach.id;

        await newCoachSchedule.save();
      }

      return response.created({
        message: "Registration success!",
      });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      }
    }
  }

  public async registerVenue({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterVenueValidator);

      const newUser = new User();
      newUser.email = data.email;
      newUser.password = data.password;
      newUser.roleId = Role["VENUE"];

      const newProfile = new Profile();
      newProfile.fullName = data.fullName;
      newProfile.dateBirth = data.dateBirth;
      newProfile.domicileId = data.domicileId;

      const newVenue = new Venue();
      newVenue.venueName = data.venueName;
      newVenue.venueAddress = data.venueAddress;
      newVenue.venueTimeOpen = data.venueTimeOpen;
      newVenue.venueTimeClose = data.venueTimeClose;
      newVenue.venueDescription = data.venueDescription;

      await newUser.related("profile").save(newProfile);
      await newProfile.related("venues").save(newVenue);

      for (let i = 0; i < data.venueSchedules.length; i++) {
        const newVenueSchedule = new VenueSchedule();
        newVenueSchedule.venueScheduleDay = data.venueSchedules[i];
        newVenueSchedule.venueId = newVenue.id;

        await newVenueSchedule.save();
      }

      for (let j = 0; j < data.venuePhotos.length; j++) {
        const newVenuePhoto = new VenuePhoto();
        newVenuePhoto.photoUrl = data.venuePhotos[j].clientName;
        newVenuePhoto.venueId = newVenue.id;

        await data.venuePhotos[j].move(
          Application.publicPath("uploads/venues"),
          {
            name: data.venuePhotos[j].clientName,
            overwrite: true,
          }
        );

        await newVenuePhoto.save();
      }

      for (let k = 0; k < data.venueSports.length; k++) {
        const newVenueChooseSport = new VenueChooseSport();
        newVenueChooseSport.venueMaxCapacity =
          data.venueSports[k].venueMaxCapacity;
        newVenueChooseSport.venuePricing = data.venueSports[k].venuePricing;
        newVenueChooseSport.venueId = newVenue.id;
        newVenueChooseSport.favSportId = data.venueSports[k].favSportId;

        await newVenueChooseSport.save();
      }

      return response.created({ message: "Registration success!" });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      } else {
        console.log(error);
      }
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(LoginValidator);

      const token = await auth.use("api").attempt(data.email, data.password);

      return response.ok({
        message: "Login success!",
        token: token.token,
      });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      } else if (error.status === 400) {
        throw new InvalidCredentialException();
      }
    }
  }
}
