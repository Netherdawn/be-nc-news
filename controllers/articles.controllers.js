const {
  fetchArticleById,
  updateArticleVotesById,
  createCommentByArticleId
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
  console.log("in the controller");
  const { username, body } = req.body;
  createCommentByArticleId(req.params, username, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};
