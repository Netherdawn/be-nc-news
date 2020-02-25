const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-sorted"));
const app = require("../app");
const connection = require("../db/connect");
const knex = require("../db/connect");

describe("/api", () => {
  after(() => connection.destroy());
  beforeEach(() => {
    return knex.seed.run();
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("GET 200 - responds with all topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(response => {
            expect(response.body.topics).to.be.an("array");
            response.body.topics.forEach(topic => {
              expect(topic).to.contain.keys(["slug", "description"]);
            });
          });
      });
    });
  });
  describe("/users", () => {
    describe("/:id", () => {
      describe("GET", () => {
        it("GET 200 responds with user object as requested in path", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(response => {
              expect(response.body.user).to.be.an("object");
              expect(response.body.user).to.contain.keys([
                "username",
                "name",
                "avatar_url"
              ]);
            });
        });
        it("GET:404 sends an appropriate and error message when given a valid but non-existent id", () => {
          return request(app)
            .get("/api/users/lordtest")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.equal("404 - not found");
            });
        });
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {
      it("GET 200 - responds with an array of articles", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.an("array");
            response.body.articles.forEach(article => {
              expect(article).to.be.an("object");
              expect(article).to.contain.keys([
                `author`,
                `title`,
                `article_id`,
                `body`,
                `topic`,
                `created_at`,
                `votes`,
                `comment_count`
              ]);
            });
          });
      });
      it("GET 200 - responds with an array of articles sorted default by date and descending", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.an("array");
            expect(response.body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET 200 - responds with an array of articles sorted by query", () => {
        return request(app)
          .get("/api/articles?sort_by=author")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.an("array");
            expect(response.body.articles).to.be.sortedBy("author", {
              descending: true
            });
          });
      });
      it("GET 200 - responds with an array of articles ordered by query", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.an("array");
            expect(response.body.articles).to.be.sortedBy("created_at", {
              descending: false
            });
          });
      });
      it("GET 200 - responds with an array of articles ordered and sorted by query", () => {
        return request(app)
          .get("/api/articles?order=asc&sort_by=author")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.an("array");
            expect(response.body.articles).to.be.sortedBy("author", {
              descending: false
            });
          });
      });
      it("GET 200 - responds with an array of articles queried by author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(response => {
            response.body.articles.forEach(article => {
              expect(article.author).to.eql("butter_bridge");
            });
          });
      });
      it("GET 200 - responds with an array of articles queried by topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(response => {
            response.body.articles.forEach(article => {
              expect(article.topic).to.eql("mitch");
            });
          });
      });
      it("GET 200 - responds with an array of articles queried, sorted and ordered", () => {
        return request(app)
          .get("/api/articles?topic=mitch&sort_by=author&order=asc")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.sortedBy("author", {
              descending: false
            });
            response.body.articles.forEach(article => {
              expect(article.topic).to.eql("mitch");
            });
          });
      });
      it("GET 404 - responds with appropriate error if looking for a column that doesn't exist", () => {
        return request(app)
          .get("/api/articles?topic=testy")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql("404 - not found");
          });
      });
      it("GET 400 - responds with appropriate error if searching a column with incorrect data type", () => {
        return request(app)
          .get("/api/articles?article_id=potato")
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.eql("400 - bad request");
          });
      });
    });
    describe("/:id", () => {
      describe("GET", () => {
        it("GET 200 - responds with article object that contains information from user & comments", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(response => {
              expect(response.body.article).to.be.an("object");
              expect(response.body.article).to.contain.keys([
                `author`,
                `title`,
                `article_id`,
                `body`,
                `topic`,
                `created_at`,
                `votes`,
                `comment_count`
              ]);
            });
        });
        it("GET 200 - an article with no comments will return a comment count of 0", () => {
          return request(app)
            .get("/api/articles/3")
            .expect(200)
            .then(response => {
              expect(response.body.article).to.be.an("object");
              expect(response.body.article.comment_count).to.eql(0);
            });
        });
        it("GET 404 - responds with appropriate error message when asked for article that doesn't exist", () => {
          return request(app)
            .get("/api/articles/212")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("404 - not found");
            });
        });
        it("GET 400 - responds with appropriate error message when not using integer to select article", () => {
          return request(app)
            .get("/api/articles/herro")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("400 - bad request");
            });
        });
      });
      describe("PATCH", () => {
        it("PATCH 200 - responds with article object with vote updated by specified amount", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(response => {
              expect(response.body.article).to.contain.keys([
                `author`,
                `title`,
                `article_id`,
                `body`,
                `topic`,
                `created_at`,
                `votes`,
                `comment_count`
              ]);
              expect(response.body.article.votes).to.eql(101);
            });
        });
        it("PATCH 200 - responds with article object with vote updated by specified even if provided a negative integer", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: -1 })
            .expect(200)
            .then(response => {
              expect(response.body.article.votes).to.eql(99);
            });
        });
        it("PATCH 400 - responds with appropriate error message if body sent does not include key value pair inc_votes: integer", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ ind_votes: -1 })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("400 - bad request");
            });
        });
        it("PATCH 400 - responds with appropriate error message if trying to update article by searching with non-integer article_id", () => {
          return request(app)
            .patch("/api/articles/moose")
            .send({ inc_votes: -1 })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("400 - bad request");
            });
        });
        it("PATCH 404 - responds with appropriate error message if trying to update article that doesn't exist", () => {
          return request(app)
            .patch("/api/articles/212")
            .send({ inc_votes: -1 })
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("404 - not found");
            });
        });
      });
      describe("/comment", () => {
        describe("POST", () => {
          it("POST 201 - creates a new row in the comments table and responds with an object with the details of the new row in the comment table", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge", body: "test" })
              .expect(201)
              .then(response => {
                expect(response.body.comment).to.contain.keys([
                  `comment_id`,
                  `author`,
                  `article_id`,
                  `votes`,
                  `created_at`,
                  `body`
                ]);
                expect(response.body.comment.comment_id).to.eql(19);
                expect(response.body.comment.body).to.eql("test");
              });
          });
          it("POST 400 - if request body is a key value pairs, will respond with appropriate error message", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge" })
              .expect(400)
              .then(response => {
                expect(response.body.msg).to.eql("400 - bad request");
              });
          });
          it("POST 422 - responds with appropriate error message if trying to add a comment to an article that doesn't exist", () => {
            return request(app)
              .post("/api/articles/422/comments")
              .send({ username: "butter_bridge", body: "what is going on?" })
              .expect(422)
              .then(response => {
                expect(response.body.msg).to.eql("422 - unprocessable entity");
              });
          });
          it("POST 201 - post request ignores additional key value pairs provided", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "butter_bridge",
                body: "what is going on?",
                test: 9001
              })
              .expect(201)
              .then(response => {
                expect(response.body.comment).to.contain.keys([
                  `comment_id`,
                  `author`,
                  `article_id`,
                  `votes`,
                  `created_at`,
                  `body`
                ]);
                expect(response.body.comment.comment_id).to.eql(19);
                expect(response.body.comment.body).to.eql("what is going on?");
              });
          });
        });
        describe("GET", () => {
          it("GET 200 - responds with all comments listed under an article", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(response => {
                response.body.comments.forEach(comment => {
                  expect(comment).to.contain.keys([
                    `comment_id`,
                    `author`,
                    `article_id`,
                    `votes`,
                    `created_at`,
                    `body`
                  ]);
                });
              });
          });
          it("GET 404 - responds with appropriate error if looking for article that doesn't exist", () => {
            return request(app)
              .get("/api/articles/404/comments")
              .expect(404)
              .then(response => {
                expect(response.body.msg).to.eql("404 - not found");
              });
          });
          it("GET 404 - responds with appropriate error when looking for article with no comments", () => {
            return request(app)
              .get("/api/articles/3/comments")
              .expect(404)
              .then(response => {
                expect(response.body.msg).to.eql("404 - not found");
              });
          });
        });
      });
    });
  });
  describe("/comments", () => {
    describe("/:id", () => {
      describe("PATCH", () => {
        it("PATCH 200 - responds with comment object with vote updated by specified amount", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(response => {
              expect(response.body.comment).to.be.an("object");
              expect(response.body.comment.votes).to.eql(17);
              expect(response.body.comment.comment_id).to.eql(1);
              expect(response.body.comment).to.contain.keys([
                `comment_id`,
                `author`,
                `article_id`,
                `votes`,
                `created_at`,
                `body`
              ]);
            });
        });
        it("PATCH 200 - responds with comment object with vote updated by specified amount even if amount is a negative integer", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: -50 })
            .expect(200)
            .then(response => {
              expect(response.body.comment).to.be.an("object");
              expect(response.body.comment.votes).to.eql(-34);
            });
        });
        it("PATCH 400 - responds with appropriate error message if body sent does not include key value pair inc_votes: integer", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ ind_votes: -1 })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("400 - bad request");
            });
        });
        it("PATCH 400 - responds with appropriate error message if trying to update article by searching with non-integer comment_id", () => {
          return request(app)
            .patch("/api/comments/carabou")
            .send({ inc_votes: -1 })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("400 - bad request");
            });
        });
        it("PATCH 404 - responds with appropriate error message if trying to increase votes on a comment that doesn't exist", () => {
          return request(app)
            .patch("/api/comments/801")
            .send({ inc_votes: -1 })
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("404 - not found");
            });
        });
      });
      describe("DELETE", () => {
        it("DELETE 204 - deletes enquiry and responds with correct status code", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204);
        });
        it("DELETE 404 - responds with appropriate error when trying to delete non-existant", () => {
          return request(app)
            .delete("/api/comments/404")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("404 - not found");
            });
        });
        it("DELETE 400 - responds with appropriate error when deleting error with incorrect datatype as param", () => {
          return request(app)
            .delete("/api/comments/captainAhab")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("400 - bad request");
            });
        });
      });
    });
  });
});
