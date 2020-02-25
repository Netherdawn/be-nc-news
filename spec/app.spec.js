const request = require("supertest");
const { expect } = require("chai");
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
  describe("/articles", () => {
    describe.only("/:id", () => {
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
  });
});
