/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.group(() => {
    Route.post("/admin", "AuthController.registerAdmin").as(
      "auth.register.register-admin"
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
