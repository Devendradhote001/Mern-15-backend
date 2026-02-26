const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/david");
    console.log(`MongoDB Connected: ${res.connection.host}`);
  } catch (error) {
    console.log("error while connecting DB");
  }
};

module.exports = connectDB;
