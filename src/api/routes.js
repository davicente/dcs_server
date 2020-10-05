const Router = require("express").Router;

exports.initializeAPI = () => {
  const router = Router();

  router.get("/helloworld", (req, res) => {
    res.send("hello world");
  });

  return router;
};