const express = require("express");
const user_route = express();
const bodyParser = require("body-parser");
const user_controller = require("../Controllers/userController");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.get("/", (req, res) => {
  res.send("hello World");
});
user_route.post("/register", user_controller.register_new_user);

user_route.post("/login", user_controller.signin);

user_route.get(
  "/verifyEmail/:verification_token/:email",
  user_controller.verifyEmail
);

user_route.post("/create-session", user_controller.create_user_using_gauth);

// user_route.get("/getProjectCounts/:id", user_controller.getCountofUserActivity);

user_route.put("/updateAccount/:userId", user_controller.UpdateAccount);

user_route.delete("/deleteAccount/:userId", user_controller.DeleteAccount);

user_route.post(
  "/requestNewVerificationToken",
  user_controller.requestNewVerificationToken
);

module.exports = user_route;
