const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const authroutes = require("./features/auth/auth.routes");
const userRoutes = require("./features/users/user.routes");
const postRoutes = require("./features/posts/post.routes");
const storyRoutes = require("./features/story/story.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("ok");
});

app.use("/api/auth", authroutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/story", storyRoutes);

app.use(errorMiddleware);

module.exports = app;
