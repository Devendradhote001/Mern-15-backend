const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const authroutes = require("./features/auth/auth.routes");
const userRoutes = require("./features/users/user.routes");
const postRoutes = require("./features/posts/post.routes");
const storyRoutes = require("./features/story/story.routes");
const commentRoutes = require("./features/comments/comment.routes");
const UserModel = require("./models/user.model");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("ok");
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      let email = profile.emails[0].value;
      let name = profile.name.givenName;
      let surname = profile.name.familyName;

      let username = name + surname;
      let un = username.toLowerCase();

      let user = await UserModel.findOne({ email });

      if (user) {
        return cb(null, user);
      }

      let newUser = await UserModel.create({
        name,
        email,
        username: un,
        password: "insta001",
      });

      return cb(null, newUser);
    }
  )
);

app.use("/api/auth", authroutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorMiddleware);

module.exports = app;
