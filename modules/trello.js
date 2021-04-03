const axios = require("axios");

let boards = {};

module.exports.getBoards = function (app, boardName, callback) {
  //Check cache
  if (boards[boardName.toLowerCase()] != undefined) {
    console.log(`Board named ${boardName} found in cache`);
    callback(boards[boardName]);
    return;
  }

  console.log(`Board named ${boardName} not found in cache, checking live API`);
  axios({
    method: "get",
    url: `https://api.trello.com/1/members/${app.config.trello.member}/boards?key=${app.config.trello.key}&token=${app.config.trello.token}`,
  })
    .then(function (response) {
      boards = [];
      response.data.forEach((board) => {
        boards[board.name.toLowerCase()] = board.id;
      });
      console.log(`Board cache updated from live API`);
      if (boards[boardName] != undefined) {
        console.log(`Board named ${boardName} now found in cache`);
        callback(boards[boardName]);
        return;
      } else {
        console.log(`Board named ${boardName} not found after cache update`);
        callback();
      }
    })
    .catch(function (error) {
      console.log(`Error getting boards from live API`);
      console.log(error);
      callback();
    });
};
