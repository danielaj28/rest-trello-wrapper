const trello = require("./trello.js");

module.exports.setup = function (app) {
  app.post("/board/:boardname/list/:listname/", (req, res) => {
    if (!app.authCheck(req, res)) {
      return;
    }

    trello.getBoards(app, req.params.boardname, (board) => {
      if (board == undefined) {
        res
          .status(500)
          .json(
            "Having trouble accessing Trello boards right now, try again later."
          );
        return;
      }

      trello.getLists(
        app,
        req.params.boardname,
        req.params.listname,
        (listId) => {
          if (listId == undefined) {
            res
              .status(500)
              .json(
                "Having trouble accessing Trello lists right now, try again later."
              );
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
        }
      );
    });

    //Check parameters supplied
    // if (req.params. == undefined || req.body. == "") {
    //   res
    //     .status(400)
    //     .json(" was not provided in the request body");
    // }

    //Get board ID from board name
    //Get list ID from list name
    //Make post to the Trello API
  });
};
