const connection = require("../db/connect");

// models for other models / middleware <<<<<<<<<<<<<<<<<<<<<<<

const fetchCommentsByArticleId = queryObj => {
  return connection("comments")
    .where("article_id", queryObj.article_id)
    .orderBy(queryObj.sort_by || "created_at", queryObj.order || "desc")
    .then(comments => {
      return comments;
    });
};

const queryBuilder = queryObj => {
  let searchTermsObj = { ...queryObj };
  delete searchTermsObj.sort_by;
  delete searchTermsObj.order;

  if (Object.keys(searchTermsObj).length === 0) {
    return true;
  }

  if (Object.keys(searchTermsObj).includes("author")) {
    searchTermsObj["articles.author"] = searchTermsObj.author;
    delete searchTermsObj.author;
  } else if (Object.keys(searchTermsObj).includes("article_id")) {
    searchTermsObj["articles.article_id"] = searchTermsObj.article_id;
    delete searchTermsObj.article_id;
  }
  return searchTermsObj;
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

const fetchEveryArticle = queryObj => {
  const searchTermsObj = queryBuilder(queryObj);

  return connection("articles")
    .count({ comment_count: "comments.article_id" })
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(queryObj.sort_by || "created_at", queryObj.order || "desc")
    .where(searchTermsObj)
    .then(results => {
      return results;
    });
};

// model for GET /articles + any queries <<<<<<<<<<<<<<<<<<<<<<<

exports.fetchAllArticles = queryObj => {
  let author;
  let slug;

  if (queryObj.author) {
    author = queryObj.author;
  }
  if (queryObj.topic) {
    slug = queryObj.topic;
  }

  return Promise.all([
    fetchEveryArticle(queryObj),
    doesItExist("users", "username", author),
    doesItExist("topics", "slug", slug)
  ]).then(([result, doesUserExist, doesTopicExist]) => {
    return result;
  });
};

// model for GET /articles/:article_id <<<<<<<<<<<<<<<<<<<<<<<

exports.fetchArticleById = articleId => {
  return Promise.all([
    fetchEveryArticle(articleId),
    doesItExist("articles", "article_id", articleId.article_id)
  ]).then(([result]) => {
    return result[0];
  });
};

// model for PATCH / articles/:article_id (increasing votes) <<<<<<<<<<<<<<<<<<<<<<<

exports.updateArticleVotesById = (articleId, votesToChange) => {
  if (
    (typeof votesToChange === "number" && votesToChange !== NaN) ||
    votesToChange === undefined
  ) {
    return this.fetchArticleById(articleId).then(article => {
      if (votesToChange) {
        article.votes += votesToChange || 0;
        return article;
      } else {
        return article;
      }
    });
  } else {
    return Promise.reject({ status: 400, msg: "400 - bad request" });
  }
};

// model for POST /articles/:article_id/comments <<<<<<<<<<<<<<<<<<<<<<<

exports.createCommentByArticleId = (articleId, username, body) => {
  const commentObj = {
    ...articleId,
    author: username,
    body: body
  };
  return connection("comments")
    .insert(commentObj)
    .returning("*")
    .then(comment => {
      return comment[0];
    });
};

// model for GET /articles/:article_id/comments <<<<<<<<<<<<<<<<<<<<<<<

exports.fetchAllCommentsByArticleId = (articleId, queryObj) => {
  const searchTermsObj = { ...articleId };
  searchTermsObj.sort_by = queryObj.sort_by;
  searchTermsObj.order = queryObj.sort_by;

  return Promise.all([
    fetchCommentsByArticleId(searchTermsObj),
    doesItExist("articles", "article_id", articleId.article_id)
  ]).then(([result]) => {
    return result;
  });
};
