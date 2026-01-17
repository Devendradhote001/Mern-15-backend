const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");

const connectDb = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/cat");
    if (res) {
      console.log("mongodb connected");
    }
  } catch (error) {
    console.log("error while connecting db");
  }
};

connectDb();

const app = express();

app.get("/user-data", async (req, res) => {
  let newUser = await UserModel.create({
    name: "Rahul",
  });

  res.send(newUser._id);
});

app.listen(3000, () => {
  console.log("server chalu hai 3000 p");
});
