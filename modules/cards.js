const trello = require("./trello.js");

module.exports.setup = function (app) {
  app.post("/board/:boardname/list/:listname/", (req, res) => {
    if (!app.authCheck(req, res)) {
      return;
    }

    let boardName = req.params.boardname.toLowerCase();
    let listName = req.params.listname.toLowerCase();

    trello.getBoards(app, boardName, (board) => {
      if (board == undefined) {
        res.status(500).json(`Could not find the Trello board ${boardName}`);
        return;
      }

      trello.getLists(app, boardName, listName, (listId) => {
        if (listId == undefined) {
          res.status(500).json(`Could not find the trello list ${listName}`);
          return;
        }

        trello.addCard(app, listId, req.body, (result) => {
          if (result) {
            res.status(200).json(`Card has been created on Trello`);
          } else {
            res.status(500).json(`There was a problem adding a new card`);
          }
          return;
        });
      });
    });
  });
};
