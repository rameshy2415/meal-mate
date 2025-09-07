import { useContext } from "react";

import { AppContext } from "../context/AppProvider";
import AddressSelection from "./AddressSelection";

const Address = () => {
  const { setShowCheckout, proceedToPayment } = useContext(AppContext);

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-3">
          <AddressSelection />
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setShowCheckout(false)}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Cart
          </button>
          {/*<button
            onClick={() => proceedToPayment("payment")}
            disabled={!deliveryAddress.street || !deliveryAddress.zipCode}
            className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button> */}

          <button
            onClick={() => proceedToPayment("payment")}
            className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;
