const connection = require("../db/connect");

// models for /articles + any queries <<<<<<<<<<<<<<<<<<<<<<<

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

// models for /articles/:article_id <<<<<<<<<<<<<<<<<<<<<<<

exports.fetchArticleById = articleId => {
  console.log(articleId.article_id);
  return Promise.all([
    fetchEveryArticle(articleId),
    doesItExist("articles", "article_id", articleId.article_id)
  ]).then(([result]) => {
    return result[0];
  });
};

// exports.fetchArticleByIdOld = articleId => {
//   return Promise.all([
//     fetchCommentsByArticleId(articleId),
//     fetchArticleObjectById(articleId)
//   ]).then(([commentArray, article]) => {
//     if (article === undefined) {
//       return Promise.reject({ status: 404, msg: "404 - not found" });
//     } else {
//       return { ...article, comment_count: commentArray.length };
//     }
//   });
// };

// Needs organising <<<<<<<<<<<<<<<<<<<<<<<

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
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "404 - not found" });
      } else {
        return article[0];
      }
    });
};
