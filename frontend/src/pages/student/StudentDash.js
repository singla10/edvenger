// src/pages/student/StudentDash.js
import React, { useContext, useEffect, useState } from "react";
import "../../Styles/StudentDash.css";
import Navbar from "../../components/Navbar";
import { ShopContext } from "../../context/shopcontext";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const StudentDash = () => {
  const { user } = useContext(ShopContext);
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]); // You can implement real enrollment later

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://edvenger.onrender.com/api/courses");
        setAllCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="student-dashboard">
        
        <aside>
          <Sidebar/>
        </aside>

        <main className="main-content">

           <section className="welcome-section">
           <h2>
           <span className="hello">Hello {user?.name || "Student"},</span><br />
           <span className="question">what would you like to learn today?</span>
          </h2>

           <div className="quick-topics">
           <button className="topic-btn">🔬 STEM Basics</button>
           <button className="topic-btn">⚙️ Robotics</button>
           <button className="topic-btn">💡 Innovation Lab</button>
          </div>

           <div className="search-bar">
      <input
        type="text"
        placeholder="Search or ask anything..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            alert(`Searching for "${e.target.value}"...`);
          }
        }}
      />
      <button onClick={() => alert("Search triggered")} className="search-icon">🔍</button>
    </div>
  </section>
          
          <section className="available-courses">
            <h3>📚 Available Courses</h3>
            <div className="course-list">
              {allCourses.map((course) => (
                <div key={course._id} className="course-card">
                  <img src={course.image} alt={course.title} />
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <Link to={`/courses/${course.slug}`} className="start-btn">Explore</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="enrolled-section">
            <h3>🚀 In Progress</h3>
            {enrolledCourses.length === 0 ? (
              <div className="empty-state">
                <p>You haven’t enrolled in any courses yet.</p>
                <Link to="/" className="enroll-btn">Enroll Now</Link>
              </div>
            ) : (
              <div className="course-list">
                {/* Loop over enrolledCourses when implemented */}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default StudentDash;
