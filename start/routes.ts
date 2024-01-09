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
}).prefix("/fav-sport");
