import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


// ✅ BASE URL (no VITE)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [socket, setSocket] = useState(null);
  

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

      if(res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      localStorage.setItem('user', JSON.stringify(res.data)); // Optional: persist in localStorage

      return { success: true };
    } catch (error) {
       console.error("🔴 Login failed:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  

  // ✅ Fetch courses for students
  const fetchCourses = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/courses/all`);
    console.log("✅ Courses fetched (ShopContext):", res.data);

    // The response structure is { success: true, courses: [...] }
    if (res.data && res.data.success) {
      setCourses(res.data.courses);
      return res.data.courses;
    } else {
      setCourses([]);
      return [];
    }
  } catch (err) {
    console.error("Failed to load courses:", err.response?.data?.message);
    setCourses([]);
    return [];
  }
};

const getCourseContent = async (courseId) => {
  try{
    const res = await axios.get(`${BASE_URL}/courses/${courseId}/content`);
    console.log("course content fetched:", res.data);
    return res.data;
  } catch (err){
    console.log(" failed to fetch course conyent:", err.response?.data?.message || err.message);
    throw err;
  }
};

 const fetchProgress = async (courseId) => {
   
  };

  // ✅ Mark a lecture as complete & emit update
  const markLectureComplete = async (courseId, lectureId) => {
    
  };
 

   


  return (
    <ShopContext.Provider value={{ registerUser, loginUser, currentUser, setCurrentUser,fetchCourses, courses,
      getCourseContent,
      fetchProgress, progress, markLectureComplete, socket, setSocket
     }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
