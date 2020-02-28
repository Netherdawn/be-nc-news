const connection = require("../db/connect");

// models for other models / middleware <<<<<<<<<<<<<<<<<<<<<<<

const fetchCommentsById = commentIdObj => {
  return connection("comments")
    .where(commentIdObj)
    .then(comment => {
      return comment[0];
    });
};

const doesItExist = (table, column, row) => {
  return connection(table)
    .select(column)
    .modify(queryBuilder => {
      if (row) {
        queryBuilder.where(column, row);
      }
    })
    .then(result => {
      if (result.length > 0) {
        return true;
      } else {
        return Promise.reject({ status: 404, msg: "404 - not found" });
      }
    });
};

// model for pathway PATCH /api/comments/:comment_id

exports.updateCommentVotesById = (commentIdObj, votesToChange) => {
  if (
    (typeof votesToChange === "number" && votesToChange !== NaN) ||
    votesToChange === undefined
  ) {
    return Promise.all([
      fetchCommentsById(commentIdObj),
      doesItExist("comments", "comment_id", commentIdObj.comment_id)
    ]).then(([comment]) => {
      comment.votes += votesToChange || 0;
      return comment;
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
          .where(commentId)
          .del();
      }
    });
};
