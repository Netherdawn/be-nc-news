const { fetchAllTopics } = require("../models/topics.models");

// pathway GET /api/topics/
exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then(topics => {
      res.send({ topics });
    })
    .catch(err => {
      next(err);
    });
};
