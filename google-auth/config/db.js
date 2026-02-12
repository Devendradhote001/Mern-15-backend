const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/auth-google");
    if (res) {
      console.log("Mongodb Connected");
    }
  } catch (error) {
    console.log("error while connecting DB");
  }
};

module.exports = connectDB;
