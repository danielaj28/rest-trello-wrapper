console.log("INFO Starting server");

const fs = require("fs");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());

try {
  app.config = JSON.parse(fs.readFileSync("./config.json").toString());
} catch (error) {
  console.error(
    "Unable to load config.json, run 'node newKey' to generate the config"
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Load Config
app.config = JSON.parse(fs.readFileSync("./config.json").toString());

//Load Modules
app.authCheck = function (req, res) {
  if (req.headers["x-api-key"] == undefined || req.headers["x-api-key"] == "") {
    res.status(400).json("Missing x-api-key header or value");
    return false;
  }

  if (
    app.config.apiKeys.filter((k) => k == req.headers["x-api-key"]).length == 0
  ) {
    res.status(401).json("API key provided is invalid");
    return false;
  }

  return true;
};

console.log("INFO Loading trello module");
const trello = require("./modules/trello.js");

console.log("INFO Loading cards module");
const cards = require("./modules/cards.js");
cards.setup(app);

//Begin
const port = process.env.PORT || 15971;
app.listen(port, () => console.log(`INFO Listening on ${port}...`));
