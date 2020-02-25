const {
  fetchArticleById,
  updateArticleVotesById,
  createCommentByArticleId,
  fetchAllCommentsByArticleId
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(article => {
      res.send({ article });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchArticleVotesById = (req, res, next) => {
  updateArticleVotesById(req.params, req.body.inc_votes)
    .then(article => {
      res.send({ article });
    })
    .catch(err => {
      next(err);
    });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  createCommentByArticleId(req.params, username, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  console.log("in the controller");
  fetchAllCommentsByArticleId(req.params)
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      next(err);
    });
};
