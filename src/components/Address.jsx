import { useState, useContext } from "react";

import { Home, Building } from "lucide-react";
import { AppContext } from "../context/AppProvider";

const Address = () => {
  const { setShowCheckout, proceedToPayment } = useContext(AppContext);

  const [deliveryAddress, setDeliveryAddress] = useState({
    type: "home",
    street: "",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "",
    landmark: "",
  });

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>

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
            onClick={() => proceedToPayment('payment')}
            disabled={!deliveryAddress.street || !deliveryAddress.zipCode}
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
