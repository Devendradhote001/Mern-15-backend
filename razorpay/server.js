require("dotenv").config();
const cors = require("cors");
const express = require("express");

const paymentRoutes = require("./routes/payment.routes");
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(express.json());
app.use(cors("*"));

app.use("/api/payment", paymentRoutes);

app.listen(3000, () => {
  console.log("server chlgya 3000 pr");
});
