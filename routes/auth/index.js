const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const UserService = require("../../services/User");

const userService = new UserService();

const checkAuthenticated = (req, resp, next) => {
  if (req.isAuthenticated()) {
    resp.send("You are already loged in");
  } else {
    next();
  }
};

authRouter.post(
  "/login",
  checkAuthenticated,
  passport.authenticate("local-signin"),
  (req, resp) => {
    resp.send("User loged in succesfully");
  }
);

authRouter.post("/register", async (req, resp) => {
  await userService.createUser(req.body);
  resp.send("User created");
});

module.exports = authRouter;
