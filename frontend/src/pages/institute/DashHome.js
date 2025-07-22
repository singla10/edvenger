// src/pages/InstituteDashboard/DashboardHome.js
import React from 'react';

// Simulated data
const dummyInstitute = {
  name: "Bright Future Academy",
  logo: "", // No image from backend, use placeholder
  totalCourses: 5,
  totalStudents: 120,
  totalTeachers: 8,
  earnings: "₹85,000"
};

const DashboardHome = () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={dummyInstitute.logo || 'https://via.placeholder.com/80'} 
          alt="Logo" 
          style={{ width: '80px', height: '80px', marginRight: '20px' }} 
        />
        <h1>{dummyInstitute.name}</h1>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <Card title="Courses" value={dummyInstitute.totalCourses} />
        <Card title="Students" value={dummyInstitute.totalStudents} />
        <Card title="Teachers" value={dummyInstitute.totalTeachers} />
        <Card title="Earnings" value={dummyInstitute.earnings} />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Course Actions</h2>
        <button>Add Course</button>
        <button>Update Course</button>
        <button>Delete Course</button>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', flex: 1 }}>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default DashboardHome;
