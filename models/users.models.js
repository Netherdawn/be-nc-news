const connection = require("../db/connect");

exports.fetchUserById = username => {
  return connection("users")
    .where(username)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "404 - user does not exist"
        });
      } else {
        return result[0];
      }
    });
};
