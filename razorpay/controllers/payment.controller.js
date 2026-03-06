const PaymentModel = require("../models/payment.model");
const paymentInstance = require("../services/payment.service");
const crypto = require("crypto");

const createOrderController = async (req, res) => {
  try {
    let { amount } = req.body;

    if (!amount)
      return res.status(400).json({
        message: "Amount is required",
      });

    let options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    let order = await paymentInstance.orders.create(options);

    let newOrder = await PaymentModel.create({
      orderId: order.id,
      amount,
    });

    return res.status(201).json({
      message: "Payment Order created",
      success: true,
      order: newOrder,
      rzp_id: process.env.RZP_KEY,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "Razorpay ids are required! unauthorize operation",
        success: false,
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    let expectedSign = crypto
      .createHmac("sha256", process.env.RZP_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      await PaymentModel.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "FAILED",
        }
      );
      return res.status(401).json({
        message: "Invalid signature",
        success: false,
      });
    }

    await PaymentModel.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        status: "SUCCESS",
      }
    );

    return res.status(200).json({
      message: "Payment verified and updated",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  createOrderController,
  verifyPaymentController,
};
