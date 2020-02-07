const express = require("express");
const app = express();
const UsersRouter = require("./routes/users");
const bodyParser = require('body-parser')

app.listen(5000, () => {
  console.log("express is listening");
});

// Bodyparser para tomar el body de las peticiones
app.use(bodyParser.json());


app.use("/users", UsersRouter);
