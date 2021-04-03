const trello = require("./trello.js");

module.exports.setup = function (app) {
  app.post("/board/:boardname/list/:listname/", (req, res) => {
    if (!app.authCheck(req, res)) {
      return;
    }

    trello.getBoards(app, req.params.boardname, (id) => {
      if (id == undefined) {
        res
          .status(500)
          .json(
            "Having trouble accessing Trello boards right now, try again later."
          );
        return;
      } else {
        res
          .status(200)
          .json(`The board id for ${req.params.boardname} = ${id}`);
        return;
      }
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
