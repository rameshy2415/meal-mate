import { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppProvider";

const PaymentButton = ({ amount }) => {
  const { clearCart, setShowCheckout, proceedToPayment } = useContext(AppContext);

  const handlePayment = async () => {
    try {
      // Step 1: Create order from backend
      const { data } = await axios.post(
        `http://localhost:8080/api/payment/create-order?amount=` + amount
      );

      // Step 2: Initialize Razorpay Checkout
      const options = {
        key: "", // from Razorpay Dashboard
        amount: data.amount,
        currency: data.currency,
        name: "Food Order App",
        description: "Test Transaction",
        order_id: data.id,
        handler: async function (response) {
          // Step 3: Verify payment
          console.log("Response", response);
          const verifyRes = await axios.post(
            "http://localhost:8080/api/payment/verify-payment",
            response
          );
          console.log("verifyRes", verifyRes.data);
          if (verifyRes.data.status === "success") {
            //alert("Payment Successful ✅");
            clearCart();
            setShowCheckout(false);
            alert("Order placed successfully! 🎉");
          } else {
            alert("Payment Verification Failed ❌");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      /*   // Verify inside Razorpay handler
      const verifyRes = await axios.post(
        "http://localhost:8080/api/payment/verify-payment",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
      ); */

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 mt-10">

      <div className="flex space-x-3">
        <button
          onClick={() => proceedToPayment("address")}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back to Address
        </button>
        <button
          onClick={handlePayment}
          className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Pay ₹{amount}
        </button>
      </div>
    </div>
  );
};

export default PaymentButton;
