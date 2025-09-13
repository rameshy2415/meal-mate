import { useState, useContext } from "react";
import upiApps from "../data/upiApps.json";
import { AppContext } from "../context/AppProvider";
import { CreditCard } from "lucide-react";
import PaymentButton from "./PaymentButton";

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const {
    isProcessingPayment,
    getCartTotal,
    paymentMethod,
    setPaymentMethod,
    selectedUpiApp,
    setSelectedUpiApp,
    upiId,
    setUpiId,
    proceedToPayment,
    clearCart,
    setIsProcessingPayment,
    setShowCheckout,
  } = useContext(AppContext);

  const cartTotal = getCartTotal();
  const deliveryFee = 2.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + deliveryFee + tax;

  const placeOrder = async () => {
    if (paymentMethod === "upi" && selectedUpiApp) {
      setIsProcessingPayment(true);

      // Simulate UPI payment processing
      setTimeout(() => {
        setIsProcessingPayment(false);
        alert(
          `Payment successful via ${
            upiApps.find((app) => app.id === selectedUpiApp)?.name
          }! 🎉\nOrder placed successfully!`
        );
        clearCart();
        setShowCheckout(false);
        setSelectedUpiApp("");
        setUpiId("");
      }, 3000);
    } else {
      alert("Order placed successfully! 🎉");
      clearCart();
      setShowCheckout(false);
    }
  };

  const processUpiPayment = () => {
    if (!selectedUpiApp) {
      alert("Please select a UPI app to continue");
      return;
    }
    placeOrder();
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        {/* Payment Method Selection */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
              paymentMethod === "card"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Credit/Debit Card</span>
          </button>
          <button
            onClick={() => setPaymentMethod("upi")}
            className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
              paymentMethod === "upi"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <span className="text-lg">💳</span>
            <span>UPI Payment</span>
          </button>
          <button
            onClick={() => setPaymentMethod("cod")}
            className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
              paymentMethod === "cod"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <span className="text-lg">💵</span>
            <span>Cash on Delivery</span>
          </button>
        </div>

        {/* Card Details Form */}
        {paymentMethod === "card" && (
          <div className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={paymentDetails.cardholderName}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardholderName: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: e.target.value,
                  })
                }
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cvv: e.target.value,
                  })
                }
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* UPI Payment */}
        {paymentMethod === "upi" && (
          <div className="mb-6 space-y-4">
            {/* UPI ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@paytm, yourname@oksbi etc."
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="text-center text-gray-500">
              <span className="text-sm">OR</span>
            </div>

            {/* UPI Apps Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select UPI App
              </label>
              <div className="grid grid-cols-2 gap-3">
                {upiApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedUpiApp(app.id)}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      selectedUpiApp === app.id
                        ? "border-orange-500 bg-orange-50 transform scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-12 h-12 rounded-full ${app.color} flex items-center justify-center text-white text-xl`}
                      >
                        {app.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {app.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected UPI App Confirmation */}
            {selectedUpiApp && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full ${
                      upiApps.find((app) => app.id === selectedUpiApp)?.color
                    } flex items-center justify-center text-white`}
                  >
                    {upiApps.find((app) => app.id === selectedUpiApp)?.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Selected:{" "}
                      {upiApps.find((app) => app.id === selectedUpiApp)?.name}
                    </p>
                    <p className="text-xs text-green-600">
                      You'll be redirected to complete payment
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment Processing */}
            {isProcessingPayment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
                  <div className="mb-4">
                    <div
                      className={`w-16 h-16 rounded-full ${
                        upiApps.find((app) => app.id === selectedUpiApp)?.color
                      } flex items-center justify-center text-white text-2xl mx-auto mb-4`}
                    >
                      {upiApps.find((app) => app.id === selectedUpiApp)?.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Processing Payment
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Please complete payment in{" "}
                      {upiApps.find((app) => app.id === selectedUpiApp)?.name}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Amount: ₹{(getCartTotal() * 83).toFixed(2)}{" "}
                    {/* Rough USD to INR conversion */}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-orange-500 pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => proceedToPayment("address")}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Address
          </button>
          {paymentMethod === "upi" ? (
            <button
              onClick={processUpiPayment}
              disabled={!selectedUpiApp && !upiId}
              className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Pay with UPI</span>
              <span>₹{(grandTotal * 83).toFixed(0)}</span>
            </button>
          ) : (
            <>
              <button
                onClick={placeOrder}
                className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Place Order
              </button>

              <PaymentButton amount={(grandTotal * 83).toFixed(0)} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
