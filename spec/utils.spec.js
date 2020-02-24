const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe.only("formatDates", () => {
  it("If passed an empty array, will return an empty array", () => {
    expect(formatDates()).to.eql([]);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
