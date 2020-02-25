const connection = require("../db/connect");

exports.updateCommentVotesById = (commentId, votesToChange) => {
  if (votesToChange) {
    return connection("comments")
      .where(commentId)
      .then(comment => {
        if (comment.length === 0) {
          return Promise.reject({ status: 404, msg: "404 - not found" });
        } else {
          comment[0].votes += votesToChange;
          return comment[0];
        }
      });
  } else {
    return Promise.reject({ status: 400, msg: "400 - bad request" });
  }
};

exports.removeCommentById = commentId => {};
