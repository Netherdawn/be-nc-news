const connection = require("../db/connect");

exports.updateCommentVotesById = (commentId, votesToChange) => {
  console.log(votesToChange);
  if (votesToChange === NaN || typeof votesToChange !== "number") {
    return Promise.reject({ status: 400, msg: "400 - bad request" });
  } else {
    return connection("comments")
      .where(commentId)
      .then(comment => {
        if (comment.length === 0) {
          return Promise.reject({ status: 404, msg: "404 - not found" });
        } else {
          comment[0].votes += votesToChange || 0;
          return comment[0];
        }
      });
  }
};

exports.removeCommentById = commentId => {
  return connection("comments")
    .where(commentId)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({ status: 404, msg: "404 - not found" });
      } else {
        return connection("comments")
          .where(commentId)
          .del();
      }
    });
};
