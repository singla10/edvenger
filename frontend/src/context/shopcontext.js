import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// ✅ BASE URL (no VITE)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

  //    if (token) {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }
   
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

  const logoutUser = async () => {
  try {
    // Optional: Inform backend (useful for logging or future blacklist)
    await axios.post(`${BASE_URL}/auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    // Clear local storage & state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);

    // Redirect to login page
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    // Even if backend fails, clear local storage so user is logged out
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
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

const createRazorpayOrder = async (courseId) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/payment/create-order`, { courseId });
    return data; // { id: "...", amount: 50000, currency: "INR", ... }
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    throw err;
  }
};

const verifyRazorpayPayment = async (paymentData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/payment/verify`, paymentData);
    return data;
  } catch (err) {
    console.error("Error verifying Razorpay payment:", err);
    throw err;
  }
};

const addToCart = async (courseId) => {}

  // // ✅ Mark a lecture as complete & emit update
  // const markLectureComplete = async (courseId, lectureId, watchedPercentage) => {
  //   try {
  //     const {data} = await axios.post(`${BASE_URL}/progress/mark-complete`,
  //       { courseId, lectureId, watchedPercentage },
  //       {withCredentials:true}
  //     );
  //     setProgress(data.progress);
  //     return data;

  //   } catch (error) {
  //     console.error("Error marking lecture complete:", error);
  //     throw error.response?.data?.message || "Failed to mark lecture complete";
  //   }
  // };
 
  // // ✅ Fetch progress for a specific course
  // const fetchProgress = async (courseId) => {
  //   try{
  //     setLoadingProgress(true);
  //     const {data} = await axios.get(`${BASE_URL}/progress/${courseId}`, {
  //       withCredentials: true
  //     });
  //     setProgress(data);
  //     return data;
  //   } catch(error) {
  //     console.error("Error fetching progress:", error);
  //     setProgress({});
  //     throw error;
  //   } finally {
  //     setLoadingProgress(false);
  //   }
  // };


  return (
    <ShopContext.Provider value={{ registerUser, loginUser, logoutUser, currentUser, setCurrentUser,fetchCourses, courses,
      getCourseContent, createRazorpayOrder, verifyRazorpayPayment, addToCart
      //fetchProgress, progress, markLectureComplete, loadingProgress
     }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
