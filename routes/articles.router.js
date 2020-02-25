const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/articles.controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotesById);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
