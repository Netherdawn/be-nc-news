const connection = require("../db/connect");

const fetchCommentsByArticleId = articleId => {
  //articleId arg must be provided as an object with keyvalue pair {article_id:integer}
  return connection("comments")
    .where(articleId)
    .then(result => result);
};

const fetchArticleObjectById = articleId => {
  //articleId arg must be provided as an object with keyvalue pair {article_id:integer}
  return connection("articles")
    .where(articleId)
    .then(result => result[0]);
};

exports.fetchArticleById = articleId => {
  return Promise.all([
    fetchCommentsByArticleId(articleId),
    fetchArticleObjectById(articleId)
  ]).then(([commentArray, article]) => {
    if (article === undefined) {
      return Promise.reject({ status: 404, msg: "404 - not found" });
    } else {
      return { ...article, comment_count: commentArray.length };
    }
  });
};

exports.updateArticleVotesById = (articleId, votesToChange) => {
  console.log(votesToChange);
  if (votesToChange) {
    return this.fetchArticleById(articleId).then(result => {
      result.votes += votesToChange;
      return result;
    });
  } else {
    return Promise.reject({ status: 400, msg: "400 - bad request" });
  }
};
