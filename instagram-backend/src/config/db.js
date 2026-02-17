const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/IG");
    if (res) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.log("error while connecting DB");
  }
};

module.exports = connectDb;
