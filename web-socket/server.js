const express = require("express");
const { Server } = require("socket.io");

const http = require("http");

const app = express();

let server = http.createServer(app);

let io = new Server(server);

app.get("/", (req, res) => {
  return res.render("index.ejs");
});

io.on("connection", (socket) => {
  console.log("user->", socket.id);

  socket.on("send", (msg) => {
    console.log("milgyaa->", msg);
  });

  socket.on("dusra", (msg) => {
    console.log("milgyaa->", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
