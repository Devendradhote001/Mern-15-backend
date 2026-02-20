require("dotenv").config();
const express = require("express");
const passport = require("passport");
const authRoutes = require("./routes/auth.routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const UserModel = require("./models/user.model");
const errorMiddleware = require("./middleware/error.middleware");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(cookieParser());

connectDB();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

app.use(express.json());

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let email = profile.emails[0].value;
        let name = profile.name.givenName;
        let existingUser = await UserModel.findOne({ email });

        if (existingUser) {
          console.log("me yaha aya");
          return cb(null, existingUser);
        }

        console.log("new user bna");

        let newUser = await UserModel.create({
          name,
          email,
          password: "987654321",
          google_id: profile.id,
        });

        return cb(null, newUser);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
