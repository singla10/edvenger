import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// ✅ BASE URL (no VITE)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setCurrentUser(JSON.parse(storedUser));
  }
}, []);

  // ✅ Register API function
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data; // send this to frontend (register.js) to decide what to do next
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

   const loginUser = async (email, password) => {
    try {

        console.log("🟡 Sending login request to backend with:", { email, password });

      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });

       console.log("🟢 Login success:", res.data);

      setCurrentUser(res.data); // Store user globally
      localStorage.setItem('user', JSON.stringify(res.data)); // Optional: persist in localStorage

      return { success: true };
    } catch (error) {
       console.error("🔴 Login failed:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  return (
    <ShopContext.Provider value={{ registerUser, loginUser, currentUser, setCurrentUser }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
