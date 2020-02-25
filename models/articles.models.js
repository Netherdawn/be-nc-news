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

const articleCommentRef = () => {
  return connection("comments")
    .select("article_id")
    .count("article_id")
    .groupBy("article_id")
    .then(result => {
      let commentRefObj = {};
      result.forEach(element => {
        commentRefObj[element.article_id] = element.count;
      });
      return commentRefObj;
    });
};

const fetchEveryArticle = queryObj => {
  let searchTermsObj = { ...queryObj };
  delete searchTermsObj.sort_by;
  delete searchTermsObj.order;
  if (Object.keys(searchTermsObj).length === 0) {
    searchTermsObj = true;
  }

  return connection("articles")
    .select("*")
    .where(searchTermsObj)
    .orderBy(queryObj.sort_by || "created_at", queryObj.order || "desc")
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "404 - not found" });
      } else {
        return articles;
      }
    });
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

exports.fetchAllArticles = queryObj => {
  return Promise.all([fetchEveryArticle(queryObj), articleCommentRef()]).then(
    ([articles, refObj]) => {
      articles.forEach(article => {
        if (refObj[article.article_id]) {
          article.comment_count = refObj[article.article_id];
        } else {
          article.comment_count = 0;
        }
      });
      return articles;
    }
  );
};
