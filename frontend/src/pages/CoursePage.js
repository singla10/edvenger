// src/pages/CoursePage.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/CoursePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`https://edvenger.onrender.com/api/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Course fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="course-loading">Loading...</div>;
  if (!course) return <div className="course-error">Course Not Found</div>;

  return (
    <>
      <Navbar />
      <div className="course-container">
        <div className="course-hero">
          <img src={course.image} alt={course.title} className="course-image" />
          <div className="course-info">
            <h1>{course.title}</h1>
            <p className="course-description">{course.description}</p>
            <div className="course-meta">
              <span>Level: <strong>{course.level}</strong></span>
              <span>Duration: <strong>{course.duration}</strong></span>
            </div>
            <button className="enroll-btn"
            onClick={() => navigate(`/courses/${course.courseId}/levels`)}>Enroll</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;
