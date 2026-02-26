const bcrypt = require("bcrypt");

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 999);
};

const hashOtp = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

const compareOtp = async (otp, hashedOtp) => {
  return await bcrypt.compare(otp, hashedOtp);
};

module.exports = {
  generateOtp,
  hashOtp,
  compareOtp,
};
