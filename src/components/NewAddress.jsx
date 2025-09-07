import { useState } from "react";
import { Home, Building, MapPin } from "lucide-react";

import states from "../data/states.json";

const NewAddress = ({ save, cancel }) => {
  /*   const [deliveryAddress, setDeliveryAddress] = useState({
    type: "home",
    street: "",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "",
    landmark: "",
  }); */

  /*   const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      mobile: "9876543210",
      pincode: "400001",
      locality: "Colaba",
      address: "123 Marine Drive, Near Gateway of India",
      city: "Mumbai",
      state: "Maharashtra",
      landmark: "Opposite Taj Hotel",
      alternatePhone: "9876543211",
      type: "Home",
    },
    {
      id: 2,
      name: "John Doe",
      mobile: "9876543210",
      pincode: "400051",
      locality: "Bandra West",
      address: "456 Linking Road, Bandra",
      city: "Mumbai",
      state: "Maharashtra",
      landmark: "Near Bandra Station",
      alternatePhone: "",
      type: "Work",
    },
  ]); */

  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    type: "Home",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.pincode ||
      !formData.locality ||
      !formData.address ||
      !formData.city ||
      !formData.state
    ) {
      alert("Please fill in all required fields");
      return;
    }

    /*    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...formData, id: editingAddress.id }
            : addr
        )
      );
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
      };
      setAddresses((prev) => [...prev, newAddress]);
    } */

    const newAddress = {
      ...formData,
      id: Date.now(),
    };
    save(newAddress);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      mobile: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
      alternatePhone: "",
      type: "Home",
    });
    //setShowForm(false);
    setEditingAddress(null);
    cancel();
  };

  const useCurrentLocation = () => {
    // Simulate getting current location
    setFormData((prev) => ({
      ...prev,
      pincode: "400001",
      locality: "Colaba",
      city: "Mumbai",
      state: "Maharashtra",
    }));
  };

  return (
    <>
      {/* Address Type Selection */}
      {/*  <div className="flex space-x-4 mb-4">
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
      </div> */}

      {/* Address Form */}
      {/* <div className="space-y-3">
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
      </div> */}

      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {editingAddress ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="space-y-4">
          {/* Use Current Location Button */}
          <button
            type="button"
            onClick={useCurrentLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors mb-4"
          >
            <MapPin size={20} />
            Use my current location
          </button>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="10-digit mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[0-9]{10}"
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[0-9]{6}"
              required
            />

            <input
              type="text"
              name="locality"
              placeholder="Locality"
              value={formData.locality}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <textarea
            name="address"
            placeholder="Address (Area and Street)"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City/District/Town"
              value={formData.city}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Select State--</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="landmark"
              placeholder="Landmark (Optional)"
              value={formData.landmark}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="alternatePhone"
              placeholder="Alternate Phone (Optional)"
              value={formData.alternatePhone}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[0-9]{10}"
            />
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Home"
                  checked={formData.type === "Home"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Home
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Work"
                  checked={formData.type === "Work"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Work
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {editingAddress ? "UPDATE" : "SAVE"}
            </button>
            <button
              onClick={resetForm}
              className="text-blue-600 px-6 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAddress;
