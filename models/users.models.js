const connection = require("../db/connect");

exports.fetchUserById = usernameObj => {
  return connection("users")
    .where(usernameObj)
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
