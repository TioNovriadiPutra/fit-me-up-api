import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Role } from "App/Enums/Role";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import Profile from "App/Models/Profile";
import User from "App/Models/User";
import RegisterValidator from "App/Validators/RegisterValidator";

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
}
