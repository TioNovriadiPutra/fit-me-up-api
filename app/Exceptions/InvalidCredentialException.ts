import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new InvalidCredentialException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InvalidCredentialException extends Exception {
  constructor(
    message: string = "Email or Password incorrect!",
    status: number = 401
  ) {
    super(message, status);
  }

  handle(error: any, ctx: HttpContextContract) {
    return ctx.response.unauthorized({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }
}
