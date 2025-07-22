import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// 1. Create Context
export const ShopContext = createContext();


// 2. Context Provider
const ShopContextProvider = ({ children }) => {
  // 3. State
  const [user, setUser] = useState(null);
  const [isLoggedIn , setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  
  const BASE_URL = 'https://edvengerbackend.vercel.app';

  // 4. On app load, get user from localStorage (if available)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // 5. Login function
  const login = async (formData) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      const { user, token } = res.data;

      // Save in state + localStorage
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      alert("Login successful");
      // window.location.href = `/${user.role}`;
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // 6. Register function
// 6. Register function (Updated)
const register = async (formData) => {
  try {
    // Send registration request
    console.log("BASE_URL:", BASE_URL);
    console.log("Register URL:", `${BASE_URL}/api/auth/register`);
    await axios.post(`${BASE_URL}/api/auth/register`, formData);

    // Immediately log in the user after successful registration
    const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: formData.email,
      password: formData.password,
    });

    const { user, token } = loginRes.data;

    // Set user and token globally using ShopContext
    setUser(user);
    setToken(token);

    // Persist in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    alert("Registered and logged in successfully ✅");

    // Redirect based on role (optional)
    // window.location.href = `/${user.role}`;

    return user;

  } catch (err) {
    const errorMsg = err.response?.data?.message || "Registration failed ❌";
    alert(errorMsg);
    console.error("Registration Error:", err.response?.data, errorMsg);
      alert(err.response?.data?.message || err.message || "Registration failed ❌");
  }
};

  // 7. Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // 8. Provide all values
  return (
    <ShopContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
