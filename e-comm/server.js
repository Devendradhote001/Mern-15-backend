import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";

const app = express();

connectDB();

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
