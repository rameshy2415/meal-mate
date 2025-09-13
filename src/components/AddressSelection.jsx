import { useState, useContext } from "react";
import addresses from "../data/addresses.json";
import { Plus } from "lucide-react";
import NewAddress from "./NewAddress";
import { AppContext } from "../context/AppProvider";

const AddressSelection = () => {
  const [selectedId, setSelectedId] = useState(addresses[0].id);
  const [showForm, setShowForm] = useState(false);
  const { setAddress } = useContext(AppContext);

  const cancelHandler = () => {
    setShowForm(false);
  };

  const saveHandler = (data) => {
    console.log("Form data", data);
    setShowForm(false);
    addresses.push(data);
  };

  const deliverHandler = (addressId) => {
    console.log("Addresses data", addresses);
    console.log("Selected Addresses Id", addressId);
    console.log("selectedId", selectedId);

    const selectedAddress = addresses.find((add) => add.id == addressId);
    console.log("Selected Addresses data", selectedAddress);
    setAddress(selectedAddress);
  };

  return (
    <div className="max-w-full mx-auto">
      {showForm && <NewAddress cancel={cancelHandler} save={saveHandler} />}

      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold mb-4">
            Select Delivery Address
          </h3>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            New Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border rounded-xl p-4 shadow-sm cursor-pointer transition ${
              selectedId === addr.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => {
              setSelectedId(addr.id);
              deliverHandler(addr.id);
            }}
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="address"
                  checked={selectedId === addr.id}
                  onChange={() => setSelectedId(addr.id)}
                  className="accent-blue-600"
                />
                <span className="font-semibold">{addr.name}</span>
                <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-md">
                  {addr.type}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {addr.mobile}
                </span>
              </label>
              <button className="text-blue-600 text-sm hover:underline hidden">
                Edit
              </button>
            </div>

            <p className="text-gray-700 mt-2 text-sm">
              {addr.address} - <b>{addr.pincode}</b>
            </p>

           {/*  {selectedId === addr.id && (
              <button
                onClick={() => deliverHandler(addr.id)}
                className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
              >
                Deliver Here
              </button>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSelection;
