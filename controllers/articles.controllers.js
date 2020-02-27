const {
  fetchArticleById,
  updateArticleVotesById,
  createCommentByArticleId,
  fetchAllCommentsByArticleId,
  fetchAllArticles
} = require("../models/articles.models");

// Pathway GET /api/articles (accepts queries)
exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

// pathway GET /api/articles/:article_id
exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(article => {
      res.send({ article });
    })
    .catch(err => {
      next(err);
    });
};

// pathway PATCH /api/articles/:article_id (only affect votes)
exports.patchArticleVotesById = (req, res, next) => {
  updateArticleVotesById(req.params, req.body.inc_votes)
    .then(article => {
      res.send({ article });
    })
    .catch(err => {
      next(err);
    });
};

//pathway POST /api/articles/:article_id/comments
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

//pathway GET /api/articles/:article_id/comments (accepts only sort_by & order queries)
exports.getCommentsByArticleId = (req, res, next) => {
  fetchAllCommentsByArticleId(req.params, req.query)
    .then(comments => {
      res.send({ comments });
    })
    .catch(err => {
      next(err);
    });
};
