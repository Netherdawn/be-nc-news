const {
  fetchArticleById,
  updateArticleVotesById
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
  console.log("in the controller");
  updateArticleVotesById(req.params, req.body.inc_votes)
    .then(article => {
      res.send({ article });
    })
    .catch(err => {
      next(err);
    });
};
