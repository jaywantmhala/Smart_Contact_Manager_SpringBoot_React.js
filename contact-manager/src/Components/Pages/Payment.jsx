import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Payment = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    console.log("payment");
    console.log(amount);

    if (amount === "" || amount == null) {
      Swal.fire("Failed", "Amount Required", "error");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8282/api/create_order",
          {
            amount: amount,
            info: "order_request",
          }
        );

        if (response.data.status === "created") {
          let options = {
            key: "rzp_test_uKr7RDy0kmGmX6",
            amount: response.data.amount,
            currency: "INR",
            name: "Smart Contact Manager",
            description: "Donation",
            image: "",
            order_id: response.data.id,
            handler: function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              Swal.fire("Good job", "Payment Successful !!", "success");
              setAmount(" ");
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "Smart Contact Manager",
            },
            theme: {
              color: "#3399cc",
            },
          };

          var rzp = new window.Razorpay(options);
          rzp.on("payment.failed", function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            Swal.fire("Failed", "OOPS Payment Failed !!", "error");
          });

          // Open Razorpay payment popup
          rzp.open();
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex   justify-center  py-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Donate for our cause
        </h2>
        <p className="text-gray-400 mb-4">I would like to contribute:</p>
        <div className="flex items-center justify-center mb-4">
          <span className="text-white text-lg">₹</span>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="w-full p-2 ml-2 bg-gray-700 border border-gray-600 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full py-2 bg-yellow-500 text-gray-800 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Next step
        </button>
      </div>
    </div>
  );
};

export default Payment;
