// admin/src/context/AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState( false);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const loginAdmin = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin/login", {
        username,
        password,
      });

      if (res.data.success) {
        const token = res.data.token;
       
        localStorage.setItem("token", token);
        setIsAdminLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      console.error("Admin login failed:", err.response?.data?.message);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("token");
  };

 
  const createCourse = async (courseData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/courses/create", courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Error creating course:", err.response?.data?.message);
      throw err;
    }
  };

  const getAllCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.courses;
  } catch (err) {
    console.error("Failed to fetch courses:", err.response?.data?.message);
    throw err;
  }
};


  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, loginAdmin, logoutAdmin, createCourse, getAllCourses }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
