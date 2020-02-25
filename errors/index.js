exports.customErrors = (err, req, res, next) => {
  console.log("in custom errors");
  console.log(err.status);
  if (err.status != undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.psqlErrors = (err, req, res, next) => {
  console.log("in psql errors");
  console.log(err.code);
  const template = {
    badRequest: { status: 400, msg: "400 - bad request" },
    unprocessableEntity: { status: 422, msg: "422 - unprocessable entity" }
  };
  const errCodes = {
    "22P02": template.badRequest,
    "23502": template.badRequest,
    "42703": template.badRequest,
    "23503": template.unprocessableEntity
  };

  if (err.code) {
    res.status(errCodes[err.code].status).send({ msg: errCodes[err.code].msg });
  } else {
    next(err);
  }
};

exports.handle500s = (err, req, res, next) => {
  console.log("defaulted to server error");
  res.status(500).send({ msg: "500 internal server error" });
};
