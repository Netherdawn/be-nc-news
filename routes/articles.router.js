const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleVotesById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles.controllers");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVotesById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId)
  .all((req, res, next) => {
    res.status(405).send({ msg: "405 - not allowed" });
  });

module.exports = articlesRouter;
