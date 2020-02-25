const {
  updateCommentVotesById,
  removeCommentById
} = require("../models/comments.models");

exports.patchCommentVotesById = (req, res, next) => {
  updateCommentVotesById(req.params, req.body.inc_votes)
    .then(comment => {
      res.send({ comment });
    })
    .catch(err => {
      next(err);
    });
};
exports.deleteCommentById = (req, res, next) => {
  removeCommentById(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};
