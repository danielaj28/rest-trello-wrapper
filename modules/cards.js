module.exports.setup = function (app) {
  app.post("/board/:boardname/list/:listname/", (req, res) => {
    app.authCheck(req, res);

    res.status(500).json("Sorry not setup yet");
    return;

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
