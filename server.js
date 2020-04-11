const express = require("express");
const app = express();

//dependencies
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const methodRouter = require("./methodExecuter");
const authRoutes = require("./routes/auth");

//Initializations
require("dotenv").config();
require("./middlewares/passport");
require("./database");

app.listen(5000, () => {
  console.log("express is listening");
});

//App settings
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(session({ secret: "node", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(authRoutes);
app.use("/services", methodRouter);
