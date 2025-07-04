// src/pages/student/CourseContent.js
import axios from "axios";
import {useState, useEffect} from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../Styles/CourseContent.css";
import Navbar from "../../components/Navbar";

const CourseContent = () => {
  const { courseId } = useParams();
   const [course, setCourse] = useState(null);
   const [completedLessons, setCompletedLessons] = useState(1); // Example: completed 1 out of 4
  const [currentLesson, setCurrentLesson] = useState(0);

   
    const totalLessons = 4;
    const progress = (completedLessons / totalLessons) * 100;
  return (
    <>
      <Navbar />
      <div className="course-content-page">
        <aside className="curriculum-sidebar">
          <h3>Course Curriculum</h3>
          <ul>
            <li>Introduction</li>
            <li>Module 1: Basics</li>
            <li>Module 2: Project</li>
            <li>Module 3: Quiz</li>
          </ul>
        </aside>

        <main className="course-video-section">
          <h2>{courseId} - Lesson {completedLessons}</h2>

          {/* ✅ Progress bar */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <span>{Math.floor(progress)}% completed</span>
          </div>

          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <button className="next-lesson"
          onClick={() =>
              completedLessons < totalLessons &&
              setCompletedLessons((prev) => prev + 1)
            } >Next Lesson</button>
        </main>
      </div>
    </>
  );
};

export default CourseContent;
