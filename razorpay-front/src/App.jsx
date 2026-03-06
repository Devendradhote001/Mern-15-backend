import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [amount, setAmount] = useState(0);

  const handlePay = async () => {
    try {
      let res = await axios.post(
        "http://localhost:3000/api/payment/create-payment-order",
        {
          amount,
        }
      );
      if (res) {
        console.log(res.data?.order?.orderId);
        let options = {
          key: res?.data.rzp_id,
          amount: res.data?.order?.amount * 100,
          currency: "INR",
          order_id: res.data?.order?.orderId,
          name: "Razorpay integration",
          description: "Test transaction",

          handler: async (response) => {
            let res = await axios.post(
              "http://localhost:3000/api/payment/verify-payment",

              response
            );

            console.log(res);
          },
          theme: {
            color: "red",
          },
        };

        let rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log("error in pay", error);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <input
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Enter amount"
      />
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default App;
