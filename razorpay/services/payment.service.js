const Razorpay = require("razorpay");

const paymentInstance = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET_KEY,
});

module.exports = paymentInstance;
