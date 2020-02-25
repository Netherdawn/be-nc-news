const commentsRouter = require("express").Router();
const {
  patchCommentVotesById,
  deleteCommentById
} = require("../controllers/comments.controllers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVotesById)
  .delete(deleteCommentById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

module.exports = commentsRouter;
