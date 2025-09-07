import  { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Home, Briefcase } from 'lucide-react';

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      mobile: '9876543210',
      pincode: '400001',
      locality: 'Colaba',
      address: '123 Marine Drive, Near Gateway of India',
      city: 'Mumbai',
      state: 'Maharashtra',
      landmark: 'Opposite Taj Hotel',
      alternatePhone: '9876543211',
      type: 'Home'
    },
    {
      id: 2,
      name: 'John Doe',
      mobile: '9876543210',
      pincode: '400051',
      locality: 'Bandra West',
      address: '456 Linking Road, Bandra',
      city: 'Mumbai',
      state: 'Maharashtra',
      landmark: 'Near Bandra Station',
      alternatePhone: '',
      type: 'Work'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    type: 'Home'
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.mobile || !formData.pincode || !formData.locality || 
        !formData.address || !formData.city || !formData.state) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id }
          : addr
      ));
    } else {
      const newAddress = {
        ...formData,
        id: Date.now()
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      landmark: '',
      alternatePhone: '',
      type: 'Home'
    });
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const useCurrentLocation = () => {
    // Simulate getting current location
    setFormData(prev => ({
      ...prev,
      pincode: '400001',
      locality: 'Colaba',
      city: 'Mumbai',
      state: 'Maharashtra'
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-0 bg-gray-50  mt-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Manage Addresses</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add New Address
            </button>
          </div>
        </div>

        {/* Address Form */}
        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
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
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="Home"
                      checked={formData.type === 'Home'}
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
                      checked={formData.type === 'Work'}
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
                  {editingAddress ? 'UPDATE' : 'SAVE'}
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
        )}

        {/* Address List */}
        <div className="p-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Addresses</h2>
          
          {addresses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin size={48} className="mx-auto mb-4 opacity-50" />
              <p>No addresses saved yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-600 hover:underline mt-2"
              >
                Add your first address
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {/* Address Type Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        {address.type === 'Home' ? (
                          <Home size={16} className="text-green-600" />
                        ) : (
                          <Briefcase size={16} className="text-blue-600" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          address.type === 'Home' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {address.type}
                        </span>
                      </div>

                      {/* Address Details */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900">{address.name}</h3>
                        <p className="text-gray-700">{address.address}</p>
                        <p className="text-gray-600">
                          {address.locality}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        {address.landmark && (
                          <p className="text-gray-500 text-sm">Landmark: {address.landmark}</p>
                        )}
                        <div className="flex gap-4 text-sm text-gray-600 mt-2">
                          <span>Mobile: {address.mobile}</span>
                          {address.alternatePhone && (
                            <span>Alt: {address.alternatePhone}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(address)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Address"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Address"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddress;