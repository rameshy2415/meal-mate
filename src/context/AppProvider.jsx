/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showCheckout, setShowCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState("address"); // 'address' or 'payment'

  // Check for logged in user on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem("foodapp_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Simple mock authentication
    const users = JSON.parse(sessionStorage.getItem("foodapp_users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem("foodapp_user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = JSON.parse(sessionStorage.getItem("foodapp_users") || "[]");
    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      return false;
    }

    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    sessionStorage.setItem("foodapp_users", JSON.stringify(users));
    setUser(newUser);
    sessionStorage.setItem("foodapp_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setShowCheckout(false);
    sessionStorage.removeItem("foodapp_user");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /*   const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  }; */

  const setAddress = (data)=>{
    setSelectedAddress(data)
  }

  const updateCartItem = (id, change) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

const proceedToPayment = (nextStep) => {
    setCurrentStep(nextStep);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        login,
        register,
        logout,
        addToCart,
        updateCartItem,
        clearCart,
        getCartTotal,
        isProcessingPayment,
        setIsProcessingPayment,
        paymentMethod,
        setPaymentMethod,
        selectedUpiApp, 
        setSelectedUpiApp,
        upiId, 
        setUpiId,
        showCheckout, 
        setShowCheckout,
        currentStep,
        proceedToPayment,
        selectedAddress, 
        setAddress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
