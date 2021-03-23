console.log("INFO Starting server");

const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("INFO Loading cards module");
const cards = require("./modules/cards.js");
cards.setup(app);

//Begin
const port = process.env.PORT || 15971;
app.listen(port, () => console.log(`INFO Listening on ${port}...`));
