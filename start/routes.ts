import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.post("/login", "AuthController.login").as("auth.login");
  Route.group(() => {
    Route.post("/admin", "AuthController.registerAdmin").as(
      "auth.register.register-admin"
    );
    Route.post("/user", "AuthController.registerUser").as(
      "auth.register.register-user"
    );
    Route.post("/coach", "AuthController.registerCoach").as(
      "auth.register.register-coach"
    );
    Route.post("/venue", "AuthController.registerVenue").as(
      "auth.register.register-venue"
    );
  }).prefix("/register");
}).prefix("/auth");

Route.group(() => {
  Route.get("/", "FavSportsController.getAllFavSports").as(
    "fav-sport.get-all-fav-sports"
  );
  Route.post("/", "FavSportsController.addFavSport")
    .middleware(["auth"])
    .as("fav-sport.add-fav-sport");
  Route.put("/:id", "FavSportsController.updateFavSport")
    .as("fav-sport.update-fav-sport")
    .middleware(["auth"]);
  Route.delete("/:id", "FavSportsController.deleteFavSport")
    .as("fav-sport.delete-fav-sport")
    .middleware(["auth"]);
}).prefix("/fav-sport");

Route.group(() => {
  Route.get("/", "DomicilesController.getAllDomiciles").as(
    "domicile.get-all-domiciles"
  );
  Route.post("/", "DomicilesController.addDomicile")
    .as("domicile.add-domicile")
    .middleware(["auth"]);
  Route.put("/:id", "DomicilesController.updateDomicile")
    .as("domicile.update-domicile")
    .middleware(["auth"]);
  Route.delete("/:id", "DomicilesController.deleteDomicile")
    .as("domicile.delete-domicile")
    .middleware(["auth"]);
}).prefix("/domicile");

Route.group(() => {
  Route.get("/domicile/:id", "VenuesController.getVenuesByDomicile").as(
    "venue.get-venues-by-domicile"
  );
})
  .prefix("/venue")
  .middleware(["auth"]);

Route.group(() => {
  Route.get("/players/:id", "LfgMatchesController.showLfgMatchPlayers").as(
    "lfg.show-lfg-match-players"
  );
  Route.post("/", "LfgMatchesController.addLfgMatch").as("lfg.add-lfg-match");
  Route.delete("/:id", "LfgMatchesController.deleteLfgMatch").as(
    "lfg.delete-lfg-match"
  );
})
  .prefix("/lfg")
  .middleware(["auth"]);

Route.group(() => {
  Route.get("/", "CoachesController.getAvailableCoaches").as(
    "coach.get-available-coaches"
  );
  Route.get("/:id", "CoachesController.showCoachDetail").as(
    "coach.show-coach-detail"
  );
})
  .prefix("/coach")
  .middleware(["auth"]);
