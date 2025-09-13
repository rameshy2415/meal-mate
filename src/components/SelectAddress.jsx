import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const SelectAddress = () => {
  const { selectedAddress: addr } = useContext(AppContext) || {};

  return (
    <div className="max-w-full mx-auto border-blue-200 bg-blue-50 border rounded-xl p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="address"
              readOnly
              checked={true}
              className="accent-blue-600"
            />
            <span className="font-semibold">{addr.name}</span>
            <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-md">
              {addr.type}
            </span>
            <span className="ml-2 text-sm text-gray-600">{addr.mobile}</span>
          </label>
        </div>

        <p className="text-gray-700 mt-2 text-sm">
          {addr.address} - <b>{addr.pincode}</b>
        </p>
      </div>
    </div>
  );
};

export default SelectAddress;
