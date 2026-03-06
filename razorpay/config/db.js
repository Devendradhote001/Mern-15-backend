const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/rzp");
    console.log("db connected");
  } catch (error) {
    console.log("error while connecting DB");
  }
};

module.exports = connectDB;
