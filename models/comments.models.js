const connection = require("../db/connect");

// model for pathway PATCH /api/comments/:comment_id

exports.updateCommentVotesById = (commentIdObj, votesToChange) => {
  return connection("comments")
    .where(commentIdObj)
    .modify(query => {
      if (votesToChange) {
        query.increment({ votes: votesToChange }).returning("*");
      }
    })
    .then(comment => {
      if (comment.length > 0) {
        return comment[0];
      } else {
        return Promise.reject({ status: 404, msg: "404 - not found" });
      }
    });
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
