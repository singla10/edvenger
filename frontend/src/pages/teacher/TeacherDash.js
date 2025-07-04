import React from 'react';
import '../../Styles/TeacherDashboard.css';
import Navbar from '../../components/Navbar';

const TeacherDashboard = () => {
  const teacherName = "Ms. Sharma"; // Example, you can fetch this from context or API

  return (
    <>
      <Navbar />
      <div className="teacher-dashboard">
        <aside className="teacher-sidebar">
          <h3>Welcome, {teacherName}</h3>
          <ul>
            <li>📘 My Courses</li>
            <li>👥 Enrolled Students</li>
            <li>📝 Upload Content</li>
            <li>📊 Progress Reports</li>
            <li>⚙️ Settings</li>
          </ul>
        </aside>

        <main className="teacher-main">
          <h2>Dashboard Overview</h2>

          <div className="dashboard-widgets">
            <div className="widget-card">
              <h3>5</h3>
              <p>Courses Published</p>
            </div>
            <div className="widget-card">
              <h3>120</h3>
              <p>Total Students</p>
            </div>
            <div className="widget-card">
              <h3>18</h3>
              <p>New Submissions</p>
            </div>
          </div>

          <section className="upload-section">
            <h3>Upload New Lesson</h3>
            <form>
              <input type="text" placeholder="Lesson Title" />
              <input type="file" />
              <textarea placeholder="Description"></textarea>
              <button type="submit">Upload</button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default TeacherDashboard;
