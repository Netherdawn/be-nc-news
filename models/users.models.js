const connection = require("../db/connect");

exports.fetchUserById = username => {
  return connection("users")
    .where(username)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "404 - not found"
        });
      } else {
        return result[0];
      }
    });
};
