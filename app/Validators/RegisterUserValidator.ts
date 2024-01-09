import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    fullName: schema.string([
      rules.alpha({
        allow: ["space"],
      }),
    ]),
    email: schema.string([
      rules.email({
        ignoreMaxLength: true,
      }),
      rules.unique({
        table: "users",
        column: "email",
      }),
    ]),
    dateBirth: schema.date(),
    password: schema.string([rules.minLength(8), rules.confirmed()]),
    favSportIds: schema.array([rules.minLength(1)]).members(schema.number()),
    domicileId: schema.number(),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "fullName.required": "Full Name must be filled!",
    "fullName.alpha": "Full Name can only contain alphabets!",
    "email.required": "Email must be filled!",
    "email.email": "Email format incorrect!",
    "email.unique": "Email already registered!",
    "dateBirth.required": "Date of Birth must be filled!",
    "password.required": "Password must be filled!",
    "password.minLength": "Password at least 8 characters!",
    "password_confirmation.confirmed": "Password Confirmation failed!",
    "favSportIds.required": "Favorite sports must be choose!",
    "favSportIds.minLength": "Favorite sports must be choose!",
    "domicileId.required": "Domicile must be filled!",
  };
}
