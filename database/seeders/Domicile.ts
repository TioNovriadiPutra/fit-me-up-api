import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Domicile from "App/Models/Domicile";

export default class extends BaseSeeder {
  public async run() {
    await Domicile.createMany([
      {
        domicileName: "Jakarta Timur",
      },
      {
        domicileName: "Jakarta Barat",
      },
      {
        domicileName: "Jakarta Selatan",
      },
      {
        domicileName: "Jakarta Utara",
      },
      {
        domicileName: "Jakarta Pusat",
      },
    ]);
  }
}
