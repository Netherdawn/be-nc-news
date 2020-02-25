const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics.controllers");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

module.exports = topicsRouter;
