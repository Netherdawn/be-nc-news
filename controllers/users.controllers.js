const { fetchUserById } = require("../models/users.models");

//pathway GET /api/users/:username/
exports.getUserById = (req, res, next) => {
  fetchUserById(req.params)
    .then(user => {
      res.send({ user });
    })
    .catch(err => {
      next(err);
    });
};
