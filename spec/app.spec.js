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
});
