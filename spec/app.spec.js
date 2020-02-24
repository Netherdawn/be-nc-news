const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const connection = require("../db/connect");

describe("/api", () => {
  after(() => connection.destroy());
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
            expect(response.body.msg).to.equal("404 - user does not exist");
          });
      });
    });
  });
});
