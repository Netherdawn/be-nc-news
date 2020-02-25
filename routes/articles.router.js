const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentByArticleId
} = require("../controllers/articles.controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotesById);

articlesRouter.route("/:article_id/comment").post(postCommentByArticleId);

module.exports = articlesRouter;
