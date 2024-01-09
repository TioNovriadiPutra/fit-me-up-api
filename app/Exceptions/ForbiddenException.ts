import { AuthorizationException } from "@adonisjs/bouncer/build/src/Exceptions/AuthorizationException";
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
| new ForbiddenException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ForbiddenException extends AuthorizationException {
  constructor(message: string = "You dont have access to this service!") {
    super(message);
  }

  handle(error: any, ctx: HttpContextContract) {
    return ctx.response.forbidden({
      error: {
        message: error.message,
        status: error.status,
      },
    });
  }
}
