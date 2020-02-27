const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const { getApiRoutes } = require("../controllers/api.controllers");
const endpoints = require("../endpoints");

apiRouter
  .route("/")
  .get((req, res, next) => {
    res.send(endpoints);
  })
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
