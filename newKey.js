const fs = require("fs");

let [nodePath, appPath, length] = process.argv;

let characterSet =
  "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

let targetLength = length ?? 255;

let newKey = "";

for (let index = 0; index < targetLength; index++) {
  newKey += characterSet.substr(
    Math.floor(Math.random() * characterSet.length),
    1
  );
}
console.log(`New Key is: ${newKey}`);

try {
  fs.statSync("./config.json");
} catch (error) {
  fs.copyFileSync("./config.template.json", "./config.json");
}

try {
  let config = JSON.parse(fs.readFileSync("./config.json").toString());
  config.apiKeys.push(newKey);
  fs.writeFileSync("./config.json", JSON.stringify(config));
  console.log("Added to config");
} catch (error) {
  console.error(
    `There was an issue adding the new key to config.json\n${error}`
  );
}
