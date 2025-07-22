// src/pages/InstituteDashboard/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
//import './sidebar.css'; // You can add styles or use inline

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Institute Panel</h2>
      <nav>
        <NavLink to="/institute/dashboard">Home</NavLink>
        <NavLink to="/institute/dashboard/courses">Courses</NavLink>
        <NavLink to="/institute/dashboard/students">Students</NavLink>
        <NavLink to="/institute/dashboard/teachers">Teachers</NavLink>
        <NavLink to="/institute/dashboard/settings">Settings</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
