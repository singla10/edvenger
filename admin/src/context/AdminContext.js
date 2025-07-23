// admin/src/context/AdminContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const loginAdmin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin/login", {
        username,
        password,
      });

      if (res.data.success) {
        setIsAdminLoggedIn(true);
        localStorage.setItem("admin-token", res.data.token);
        return true;
      }
    } catch (err) {
      console.error("Admin login failed:", err.response?.data?.message);
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("admin-token");
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
