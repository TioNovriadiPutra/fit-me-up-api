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
  Route.group(() => {
    Route.get("/active", "UsersController.getActiveBooking").as(
      "user.book.get-active-booking"
    );
    Route.get("/history", "UsersController.getHistoryBooking").as(
      "user.book.get-history-booking"
    );
    Route.get("/transaction", "UsersController.getTransactions");
    Route.put("/top-up", "UsersController.topUp");
    Route.put("/withdraw", "UsersController.withdraw");
    Route.get("/detail/:id", "UsersController.showBookingDetail").as(
      "user.book.show-booking-detail"
    );
    Route.post("/coach/:id", "UsersController.bookCoach").as(
      "user.book.book-coach"
    );
    Route.post("/venue/:id", "UsersController.bookVenue").as(
      "user.book.book-venue"
    );
  }).prefix("/book");
  Route.get("/join-lfg/:id", "UsersController.joinLfgMatch").as(
    "user.join-lfg-match"
  );
  Route.get("/quit-lfg/:id", "UsersController.quitLfgMatch").as(
    "user.quit-lfg-match"
  );
})
  .prefix("/user")
  .middleware(["auth"]);

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
  Route.get("/book/:id", "VenuesController.showVenueRequestDetail").as(
    "venue.show-venue-request-detail"
  );
  Route.get("/domicile/:id", "VenuesController.getVenuesByDomicile").as(
    "venue.get-venues-by-domicile"
  );

  Route.group(() => {
    Route.get("/", "VenuesController.getPendingVenueRequest").as(
      "venue.get-venue-request"
    );
    Route.patch("/accept/:id", "VenuesController.acceptVenueRequest").as(
      "venue.pending.accept-venue-request"
    );
    Route.patch("/decline/:id", "VenuesController.declineVenueRequest").as(
      "venue.pendin.decline-venue-request"
    );
  }).prefix("/pending");

  Route.get("/ongoing", "VenuesController.getOngoingVenueRequest").as(
    "venue.get-ongoing-venue-request"
  );
  Route.get("/history", "VenuesController.getVenueRequestHistory").as(
    "venue.get-venue-request-history"
  );
  Route.get("/owner", "VenuesController.getOwnerVenueList").as(
    "venue.get-owner-venue-list"
  );
  Route.get("/detail/:id", "VenuesController.showVenueDetail").as(
    "venue.show-venue-detail"
  );
  Route.post("/cup", "VenuesController.addCup");
})
  .prefix("/venue")
  .middleware(["auth"]);

Route.group(() => {
  Route.get("/nearby", "LfgMatchesController.getNearbyLfg").as(
    "lfg.get-nearby-lfg"
  );
  Route.get("/available", "LfgMatchesController.getAvailableLfg").as(
    "lfg.get-available-lfg"
  );
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
  Route.group(() => {
    Route.get("/", "CoachesController.getPendingCoachRequest").as(
      "coach.get-pending-coach-request"
    );
    Route.patch("/accept/:id", "CoachesController.acceptCoachRequest").as(
      "coach.accept-coach-request"
    );
    Route.patch("/decline/:id", "CoachesController.declineCoachRequest").as(
      "coach.decline-coach-request"
    );
  }).prefix("/pending");
  Route.get("/ongoing", "CoachesController.getOngoingCoachRequest").as(
    "coach.get-ongoing-coach-request"
  );
  Route.get("/history", "CoachesController.getCoachRequestHistory").as(
    "coach.get-coach-request-history"
  );
  Route.get("/:id", "CoachesController.showCoachDetail").as(
    "coach.show-coach-detail"
  );
  Route.get("/book/detail/:id", "CoachesController.showCoachRequestDetail").as(
    "coach.show-coach-request-detail"
  );
  Route.put("/", "CoachesController.updateCoachProfile").as(
    "coach.update-coach-profile"
  );
})
  .prefix("/coach")
  .middleware(["auth"]);
