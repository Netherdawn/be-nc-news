const ENV = process.env.NODE_ENV || "development";

exports.testData = require("./test-data");
exports.devData = require("./development-data");

const data = {
  development: devData,
  test: testData
};

module.exports = data[ENV];
