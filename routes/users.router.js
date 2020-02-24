const usersRouter = require("express").Router();
const { getUserById } = require("../controllers/users.controllers");

usersRouter.get("/:username", getUserById);

module.exports = usersRouter;
