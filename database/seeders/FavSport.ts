import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import FavSport from "App/Models/FavSport";

export default class extends BaseSeeder {
  public async run() {
    await FavSport.createMany([
      {
        sportName: "Badminton",
        sportIcon: "shuttlecock.png",
      },
      {
        sportName: "Futsal",
        sportIcon: "soccer-ball.png",
      },
    ]);
  }
}
