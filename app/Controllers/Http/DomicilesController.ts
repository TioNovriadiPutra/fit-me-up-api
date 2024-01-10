import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import ForbiddenException from "App/Exceptions/ForbiddenException";
import Domicile from "App/Models/Domicile";
import AddDomicileValidator from "App/Validators/AddDomicileValidator";

export default class DomicilesController {
  public async getAllDomiciles({ response }: HttpContextContract) {
    const domicileData = await Domicile.all();

    return response.ok({ message: "Data fetched!", data: domicileData });
  }

  public async addDomicile({
    request,
    response,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("DomicilePolicy").authorize("create");

      const data = await request.validate(AddDomicileValidator);

      const newDomicile = new Domicile();
      newDomicile.domicileName = data.domicileName;

      await newDomicile.save();

      return response.created({ message: "New domicile added successfully!" });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      } else if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      }
    }
  }

  public async updateDomicile({
    request,
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("DomicilePolicy").authorize("update");

      const data = await request.validate(AddDomicileValidator);

      const domicileData = await Domicile.findOrFail(params.id);
      domicileData.domicileName = data.domicileName;

      await domicileData.save();

      return response.ok({ message: "Domicile updated successfully!" });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      } else if (error.status === 422) {
        throw new CustomValidationException(error.messages);
      } else if (error.status === 404) {
        throw new DataNotFoundException("Domicile data not found!");
      }
    }
  }

  public async deleteDomicile({
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      await bouncer.with("DomicilePolicy").authorize("delete");

      const domicileData = await Domicile.findOrFail(params.id);

      await domicileData.delete();

      return response.ok({ message: "Domicile removed successfully!" });
    } catch (error) {
      if (error.status === 403) {
        throw new ForbiddenException();
      } else if (error.status === 404) {
        throw new DataNotFoundException("Domicile data not found!");
      }
    }
  }
}
