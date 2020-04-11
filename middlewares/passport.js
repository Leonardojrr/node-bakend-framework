const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const UserService = require("../services/User");

const userService = new UserService();

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  userService.getUser(email).then((user) => {
    done(null, user[0]);
  });
});

// sign in logic

const authenticateUser = async (email, password, done) => {
  let user = await userService.getUser(email);

  if (user) {
    if (await bcrypt.compare(password, user[0].password)) {
      return done(null, user[0]);
    } else {
      return done(null, false, { message: "Password is incorrect" });
    }
  } else {
    return done(null, false, { message: "User doesn't exist" });
  }
};

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    authenticateUser
  )
);
