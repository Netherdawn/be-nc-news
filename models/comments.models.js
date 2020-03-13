const connection = require("../db/connect");

// model for pathway PATCH /api/comments/:comment_id

exports.updateCommentVotesById = (commentIdObj, votesToChange) => {
  if (
    (votesToChange.hasOwnProperty("inc_votes") &&
      Object.keys(votesToChange).length === 1) ||
    Object.keys(votesToChange).length === 0
  ) {
    return connection("comments")
      .where(commentIdObj)
      .increment("votes", votesToChange.inc_votes || 0)
      .returning("*")
      .then(comment => {
        if (comment.length > 0) {
          return comment[0];
        } else {
          return Promise.reject({ status: 404, msg: "404 - not found" });
        }
      });
  } else {
    return Promise.reject({ status: 400, msg: "400 - bad request" });
  }
};

// model for pathway POST /api/comments/:comment_id

exports.removeCommentById = commentIdObj => {
  return connection("comments")
    .where(commentIdObj)
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "404 - not found" });
      } else {
        return connection("comments")
          .where(commentIdObj)
          .del();
      }
    });
};
