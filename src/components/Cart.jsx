import { useContext } from "react";
import { Link } from "react-router";
import {
  MoveLeft,
  ShoppingCart,
  Plus,
  Minus,
  MapPin,
  CreditCard,
} from "lucide-react";
import { AppContext } from "../context/AppProvider";
import Payment from "./Payment";
import Address from "./Address";
import PaymentButton from "./PaymentButton";
import SelectAddress from "./SelectAddress";
import CartSummary from "./CartSummary";

const Cart = () => {
  const {
    cart: cartItems,
    getCartTotal,
    updateCartItem,
    showCheckout,
    setShowCheckout,
    currentStep,
    proceedToPayment,
    user,
  } = useContext(AppContext);

  const handleCheckout = () => {
    setShowCheckout(true);
    proceedToPayment("address");
  };

  const cartTotal = getCartTotal();
  const deliveryFee = 2.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + deliveryFee + tax;

  return (
    <>
      <div className="fixed inset-0 z-70 overflow-hidden md:static md:inset-auto md:flex md:justify-center md:mt-7 ">
        <div className="absolute right-0 top-0 md:static h-full w-full max-w-lg md:max-w-2xl md:p-6 bg-white transform transition-transform duration-300 ease-in-out overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Back btn for mobile device */}
            <div className="flex md:hidden items-center justify-between p-6 border-b border-gray-300">
              <Link to="..">
                <MoveLeft className="h-5 w-5" />
              </Link>

              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button className="p-2 hover:bg-gray-100 rounded-full"></button>
            </div>

            {/* Items Details */}
            <div className="flex-1 p-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Your cart is empty</p>
                  <div className="flex justify-center mt-5">
                    {user ? (
                      <Link
                        to="/"
                        className="w-full md:w-2/4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        Show now
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="w-full md:w-2/4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        Login
                      </Link>
                    )}
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

            {/* Total Summary details*/}
            {cartItems.length > 0 && !showCheckout && (
              <div className="border-t border-gray-300 p-6">
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
                  <div className="border-t border-gray-300 pt-2">
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
            {showCheckout && cartItems.length > 0 && (
              <div className="border-t border-gray-300 p-6 ">
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
                  <>
                    <Address />
                  </>
                )}

                {/* Payment Step */}
                {/*  {currentStep === "payment" && <Payment />} */}
                {currentStep === "payment" && (
                  <>
                    <SelectAddress />
                    <CartSummary />
                    <PaymentButton amount={(grandTotal * 83).toFixed(0)} />
                  </>
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
