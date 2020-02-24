const connection = require("../db/connect");

exports.fetchAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(result => {
      return result;
    });
};
