const request = require("supertest");
const chai = require("chai");
const app = require("../app");
const connection = require("../db/connect");

describe("/api", () => {
  after(() => connection.destroy());
  describe("/topics", () => {
    describe("GET", () => {
      it("GET 200 - responds with all topics", () => {});
    });
  });
});
