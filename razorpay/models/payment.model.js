const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: String,
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model("payments", paymentSchema);
module.exports = PaymentModel;
