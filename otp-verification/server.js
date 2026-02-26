const express = require("express");
const authRoutes = require("./routes/auth.routes");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/getmail", (req, res) => {
  return res.render("getEmail");
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
