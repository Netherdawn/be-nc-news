const {
  fetchArticleById,
  updateArticleVotesById,
  createCommentByArticleId,
  fetchAllCommentsByArticleId,
  fetchAllArticles
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
  fetchAllCommentsByArticleId(req.params)
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

// exports.getAllArticles = (req, res, next) => {
//   fetchEveryArticleNew(req.query)
//     .then(articles => {
//       res.send({ articles });
//     })
//     .catch(err => {
//       next(err);
//     });
// };
