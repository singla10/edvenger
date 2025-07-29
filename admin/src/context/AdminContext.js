// admin/src/context/AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const Admin_Base_URL = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token received from backend", token);
    if (token) {
      console.log("Token found in localStorage", token);
      setIsAdminLoggedIn(true);
    } else {
      console.log("no token found in local storage");
    }
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post(`${Admin_Base_URL}/auth/admin/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setIsAdminLoggedIn(true);
        return {success: true};
        
      }else{
        return {success: false, message: res.data.message};
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
       const formData = new FormData();
     for (const key in courseData) {
       if (key === "gradeRange") {
        formData.append("gradeRangeMin", courseData.gradeRange.min);
        formData.append("gradeRangeMax", courseData.gradeRange.max);
      } else {
      formData.append(key, courseData[key]);
      }
     }

     for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
     }

    
      const res = await axios.post(`${Admin_Base_URL}/courses/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    const res = await axios.get(`${Admin_Base_URL}/courses/all`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
    console.log("✅ Full course data from backend:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch courses:", err.response?.data?.message);
    throw err;
  }
};





  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, loginAdmin, logoutAdmin, createCourse, getAllCourses, }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
