const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// otpSchema.pre("save", async function (next) {
//   this.otp = await bcrypt.hash(this.otp, 10);
//   next();
// });

const OtpModel = mongoose.model("otp", otpSchema);
module.exports = OtpModel;
