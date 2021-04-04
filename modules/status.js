module.exports.setup = function (app) {
  app.get("/status/", (req, res) => {
    res.status(200).json(`It's ALIVE!`);
    return;
  });
};
