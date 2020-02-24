exports.customErrors = (err, req, res, next) => {
  // console.log('customErrors');
  if (err.status != undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.psqlErrors = (err, req, res, next) => {
  // console.log('psql errors');
  // console.log(err.code);
  const errCodes = ["22P02", "23502", "42703"];
  if (errCodes.includes(err.code)) {
    res.status(400).send({ msg: "400 bad request" });
  } else {
    next(err);
  }
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "500 internal server error" });
};
