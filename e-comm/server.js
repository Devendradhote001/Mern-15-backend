import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.routes.js";

import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

import { connectDB } from "./config/db.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { cacheInstance } from "./services/cache.service.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

connectDB();

cacheInstance.on("connect", () => {
  console.log("Redis connected");
});

cacheInstance.on("error", (err) => {
  console.log("Error connecting redis");
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      return cb(null, profile);
    }
  )
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    return res.send(req.user);
  }
);

// accepting form-data--

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", authMiddleware, cartRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
