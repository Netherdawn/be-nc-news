const usersRouter = require("express").Router();
const { getUserById } = require("../controllers/users.controllers");

usersRouter
  .route("/usernmae")
  .get(getUserById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

module.exports = usersRouter;
