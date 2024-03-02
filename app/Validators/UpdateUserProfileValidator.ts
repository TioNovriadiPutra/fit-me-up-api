import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateUserProfileValidator {
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
  public refs = schema.refs({
    userId: this.ctx.auth.user!.id,
  });

  public schema = schema.create({
    fullName: schema.string([
      rules.alpha({
        allow: ["space"],
      }),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({
        table: "users",
        column: "email",
        whereNot: {
          id: this.refs.userId,
        },
      }),
    ]),
    dateBirth: schema.date(),
    password: schema.string.optional([rules.minLength(8), rules.confirmed()]),
    profilePic: schema.file.optional({
      extnames: ["png", "jpg", "jpeg"],
    }),
    phoneNumber: schema.string([
      rules.mobile({
        locale: ["id-ID"],
      }),
    ]),
    favSportIds: schema.array().members(schema.number()),
    bankId: schema.number.optional(),
    bankNumber: schema.string.optional(),
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
  public messages: CustomMessages = {};
}
