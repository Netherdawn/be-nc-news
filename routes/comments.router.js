const commentsRouter = require("express").Router();
const { patchCommentVotesById } = require("../controllers/");

commentsRouter.patch("/:comment_id", patchCommentVotesById);

module.exports = commentsRouter;
