const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("ok");
});

app.use(errorMiddleware);

module.exports = app;
