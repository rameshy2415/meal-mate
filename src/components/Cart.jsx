import React, { useState, useContext } from "react";
import { Link } from "react-router";
import {
  MoveLeft,
  ShoppingCart,
  X,
  Plus,
  Minus,
  MapPin,
  CreditCard,
  Home,
  Building,
} from "lucide-react";
import { AppContext } from "../context/AppProvider";
const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState("address"); // 'address' or 'payment'
  const {cart: cartItems, setCart: setCartItems, updateCartItem} = useContext(AppContext)

  const [deliveryAddress, setDeliveryAddress] = useState({
    type: "home",
    street: "",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "",
    landmark: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const upiApps = [
    { id: "paytm", name: "Paytm", icon: "💰", color: "bg-blue-500" },
    { id: "gpay", name: "Google Pay", icon: "🟢", color: "bg-green-500" },
    { id: "phonepe", name: "PhonePe", icon: "💜", color: "bg-purple-500" },
    { id: "amazpay", name: "Amazon Pay", icon: "🟠", color: "bg-orange-600" },
    { id: "bhim", name: "BHIM", icon: "🇮🇳", color: "bg-blue-600" },
    { id: "cred", name: "CRED", icon: "💳", color: "bg-black" },
  ];

  console.log(setIsProcessingPayment, isCartOpen);

  const proceedToPayment = () => {
    setCurrentStep("payment");
  };

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
        setCartItems([]);
        setShowCheckout(false);
        setIsCartOpen(false);
        setSelectedUpiApp("");
        setUpiId("");
      }, 3000);
    } else {
      alert("Order placed successfully! 🎉");
      setCartItems([]);
      setShowCheckout(false);
      setIsCartOpen(false);
    }
  };

  const processUpiPayment = () => {
    if (!selectedUpiApp) {
      alert("Please select a UPI app to continue");
      return;
    }
    placeOrder();
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setCurrentStep("address");
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + deliveryFee + tax;

  return (
    <>
      <div className="fixed inset-0 z-70 overflow-hidden md:static md:inset-auto md:min-h-screen md:flex md:justify-center md:mt-7">
        {/*  <div
          className="absolute inset-0 bg-opacity-50"
          onClick={() => setIsCartOpen(false)}
        ></div> */}
        <div className="absolute right-0 top-0 md:static h-full w-full max-w-md md:max-w-lg md:p-6 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="flex md:hidden items-center justify-between p-6 border-b border-orange-500">
              <Link to="..">
                <MoveLeft className="h-5 w-5" />
              </Link>

              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {/* <X className="h-5 w-5" /> */}
              </button>
            </div>

            <div className="flex-1 p-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Your cart is empty</p>
                  <div className="flex justify-center mt-5">
                    <Link
                      to="/login"
                      className="w-full md:w-2/4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4"
                    >
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-orange-600 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartItem(item.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItem(item.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && !showCheckout && (
              <div className="border-t border-orange-500 p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

            {/* Checkout Flow */}
            {showCheckout && (
              <div className="border-t border-orange-500 p-6 ">
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center space-x-2 ${
                        currentStep === "address"
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep === "address"
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">Address</span>
                    </div>
                    <div className="w-8 h-px bg-gray-300"></div>
                    <div
                      className={`flex items-center space-x-2 ${
                        currentStep === "payment"
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep === "payment"
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">Payment</span>
                    </div>
                  </div>
                </div>

                {/* Address Step */}
                {currentStep === "address" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Delivery Address
                    </h3>

                    {/* Address Type Selection */}
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            type: "home",
                          })
                        }
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                          deliveryAddress.type === "home"
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-300"
                        }`}
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </button>
                      <button
                        onClick={() =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            type: "office",
                          })
                        }
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                          deliveryAddress.type === "office"
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-300"
                        }`}
                      >
                        <Building className="h-4 w-4" />
                        <span>Office</span>
                      </button>
                    </div>

                    {/* Address Form */}
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={deliveryAddress.street}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            street: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={deliveryAddress.city}
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              city: e.target.value,
                            })
                          }
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={deliveryAddress.zipCode}
                          onChange={(e) =>
                            setDeliveryAddress({
                              ...deliveryAddress,
                              zipCode: e.target.value,
                            })
                          }
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Landmark (Optional)"
                        value={deliveryAddress.landmark}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            landmark: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Back to Cart
                      </button>
                      <button
                        onClick={proceedToPayment}
                        disabled={
                          !deliveryAddress.street || !deliveryAddress.zipCode
                        }
                        className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Payment Method
                    </h3>

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
                                  upiApps.find(
                                    (app) => app.id === selectedUpiApp
                                  )?.color
                                } flex items-center justify-center text-white`}
                              >
                                {
                                  upiApps.find(
                                    (app) => app.id === selectedUpiApp
                                  )?.icon
                                }
                              </div>
                              <div>
                                <p className="text-sm font-medium text-green-800">
                                  Selected:{" "}
                                  {
                                    upiApps.find(
                                      (app) => app.id === selectedUpiApp
                                    )?.name
                                  }
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
                                    upiApps.find(
                                      (app) => app.id === selectedUpiApp
                                    )?.color
                                  } flex items-center justify-center text-white text-2xl mx-auto mb-4`}
                                >
                                  {
                                    upiApps.find(
                                      (app) => app.id === selectedUpiApp
                                    )?.icon
                                  }
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  Processing Payment
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                  Please complete payment in{" "}
                                  {
                                    upiApps.find(
                                      (app) => app.id === selectedUpiApp
                                    )?.name
                                  }
                                </p>
                              </div>
                              <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                              </div>
                              <div className="mt-4 text-xs text-gray-500">
                                Amount: ₹{(grandTotal * 83).toFixed(2)}{" "}
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
                        onClick={() => setCurrentStep("address")}
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
                        <button
                          onClick={placeOrder}
                          className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                          Place Order
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
