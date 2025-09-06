/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, createContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Check for logged in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("foodapp_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    // Simple mock authentication
    const users = JSON.parse(localStorage.getItem("foodapp_users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("foodapp_user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("foodapp_users") || "[]");
    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser) {
      return false;
    }

    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem("foodapp_users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("foodapp_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("foodapp_user");
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

  const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
