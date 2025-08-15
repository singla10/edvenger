import React, { useEffect, useState } from 'react';
import { useShop } from '../context/shopcontext';

const Profile = () => {
  const { currentUser, logoutUser } = useShop();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <div>Loading your profile...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.instituteName && <p><strong>Institute:</strong> {user.instituteName}</p>}
      </div>
      <button onClick={logoutUser} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Profile;
