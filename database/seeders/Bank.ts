import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Bank from "App/Models/Bank";

export default class extends BaseSeeder {
  public async run() {
    await Bank.createMany([
      {
        bankName: "Bank Central Asia (BCA)",
      },
      {
        bankName: "Bank Rakyat Indonesia (BNI)",
      },
      {
        bankName: "Bank Negara Indonesia (BNI)",
      },
      {
        bankName: "Mandiri",
      },
    ]);
  }
}
