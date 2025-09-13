import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const CartSummary = () => {
  const { getCartTotal } = useContext(AppContext);

  const cartTotal = getCartTotal();
  const deliveryFee = 2.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + deliveryFee + tax;

  return (
    <>
      {/* Order Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Price (items):</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
            <span>Total Payable:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
