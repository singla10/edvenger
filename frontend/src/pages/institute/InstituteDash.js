// src/pages/InstituteDashboard/InstituteDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const InstituteDash = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default InstituteDash;
