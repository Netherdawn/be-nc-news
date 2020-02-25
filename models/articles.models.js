const connection = require("../db/connect");

const fetchCommentsByArticleId = articleId => {
  //articleId arg must be provided as an object with keyvalue pair {article_id:integer}
  return connection("comments")
    .where(articleId)
    .then(comments => comments);
};

const fetchArticleObjectById = articleId => {
  //articleId arg must be provided as an object with keyvalue pair {article_id:integer}
  return connection("articles")
    .where(articleId)
    .then(article => article[0]);
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
  if (votesToChange) {
    return this.fetchArticleById(articleId).then(article => {
      article.votes += votesToChange;
      return article;
    });
  } else {
    return Promise.reject({ status: 400, msg: "400 - bad request" });
  }
};

exports.createCommentByArticleId = (articleId, username, body) => {
  const commentObj = {
    ...articleId,
    author: username,
    body: body
  };
  console.log(commentObj);
  return connection("comments")
    .insert(commentObj)
    .returning("*")
    .then(comment => {
      return comment[0];
    });
};

exports.fetchAllCommentsByArticleId = articleId => {
  return fetchCommentsByArticleId(articleId).then(comments => {
    if (comments.length === 0) {
      return Promise.reject({ status: 404, msg: "404 - not found" });
    } else {
      return comments;
    }
  });
};
