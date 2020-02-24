const express = require("express");
const apiRouter = require("./routes/apiRouter");
const { customErrors, psqlErrors, handle500s } = require("./errors");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

// Error handling
app.use(customErrors);
app.use(psqlErrors);
app.use(handle500s);

module.exports = app;
