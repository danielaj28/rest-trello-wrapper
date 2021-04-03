console.log("INFO Starting server");

const express = require("express");
var cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Load Config
app.config = JSON.parse(fs.readFileSync("./config.json").toString());

//Load Modules
console.log("INFO Loading trello module");
const trello = require("./modules/trello.js");

console.log("INFO Loading cards module");
const cards = require("./modules/cards.js");
cards.setup(app);

//Begin
const port = process.env.PORT || 15971;
app.listen(port, () => console.log(`INFO Listening on ${port}...`));
