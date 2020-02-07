const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.listen(5000, () => {
  console.log("express is listening");
});

// Bodyparser para tomar el body de las peticiones
app.use(bodyParser.json());


