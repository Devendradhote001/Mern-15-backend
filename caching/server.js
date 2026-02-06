require("dotenv").config();
const express = require("express");
const cacheInstance = require("./services/cache.service");

const app = express();

cacheInstance.on("connect", () => {
  console.log("redis connected");
});

cacheInstance.on("error", (err) => {
  console.log("error connecting redis", err);
});

app.get("/", async (req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
