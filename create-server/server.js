const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");

const connectDb = async () => {
  try {
    let res = await mongoose.connect("mongodb://localhost:27017/cat");
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
    name: "rahul",
    mobile: 2345678,
  });

  res.send(newUser._id);
});

app.listen(3000, () => {
  console.log("server chalu hai 3000 p");
});

// rest apis---

// get -> bhejne ke liye
// post -> kuch frontend se lene k liye
// update ->  1.put -> update krne k liye ,
//  2. patch -> single entity update krne k liye
// delete -> koi bhi data delete krne k liye
