const axios = require("axios");

let boards = {};

module.exports.getBoards = function (app, boardName, callback) {
  //Check cache
  if (boards[boardName.toLowerCase()] != undefined) {
    console.log(`Board ${boardName} found in cache`);
    callback(boards[boardName]);
    return;
  }

  console.log(`Board ${boardName} cache miss`);
  axios({
    method: "get",
    url: `https://api.trello.com/1/members/${app.config.trello.member}/boards?key=${app.config.trello.key}&token=${app.config.trello.token}`,
  })
    .then(function (response) {
      boards = [];
      response.data.forEach((board) => {
        boards[board.name.toLowerCase()] = { id: board.id, lists: {} };
      });
      console.log(`Pulled boards from live API`);
      console.debug(boards);
      if (boards[boardName] != undefined) {
        console.log(`Board ${boardName} now found`);
        callback(boards[boardName]);
        return;
      } else {
        console.log(`Board ${boardName} not found after cache update`);
        callback();
      }
    })
    .catch(function (error) {
      console.log(`Error getting boards from live API`);
      console.log(error);
      callback();
    });
};

module.exports.getLists = function (app, boardName, listName, callback) {
  //Check cache
  if (
    boards[boardName.toLowerCase()].lists[listName.toLowerCase()] != undefined
  ) {
    console.log(`List ${listName} found in cache`);
    callback(boards[boardName.toLowerCase()].lists[listName.toLowerCase()]);
    return;
  }

  console.log(`List ${listName} cache miss`);
  axios({
    method: "get",
    url: `https://api.trello.com/1/boards/${boards[boardName].id}/lists?key=${app.config.trello.key}&token=${app.config.trello.token}`,
  })
    .then(function (response) {
      boards[boardName.toLowerCase()].lists = {};

      response.data.forEach((list) => {
        boards[boardName.toLowerCase()].lists[list.name.toLowerCase()] =
          list.id;
      });

      console.log(`Pulled lists from live API`);

      if (
        boards[boardName.toLowerCase()].lists[listName.toLowerCase()] !=
        undefined
      ) {
        console.log(`List ${listName} now found in cache`);
        callback(boards[boardName.toLowerCase()].lists[listName.toLowerCase()]);
        return;
      } else {
        console.log(`List ${listName} not found after cache update`);
        callback();
      }
    })
    .catch(function (error) {
      console.log(`Error getting lists from live API`);
      console.log(error);
      callback();
    });

  module.exports.addCard = function (app, listId, cardData, callback) {
    console.log(`Adding new card`);

    axios({
      method: "post",
      url: `https://api.trello.com/1/cards?key=${app.config.trello.key}&token=${app.config.trello.token}&name=${cardData.title}&idList=${listId}`,
    })
      .then(function (response) {
        callback(response.status == 200);
      })
      .catch(function (error) {
        console.log(`Error creating card on live API`);
        console.log(error);
        callback(false);
      });
  };
};
