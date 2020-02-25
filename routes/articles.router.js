const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById
} = require("../controllers/articles.controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotesById);

module.exports = articlesRouter;
