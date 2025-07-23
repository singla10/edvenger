import { useState } from 'react';
import { useShop } from '../context/shopcontext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { registerUser } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    instituteName: '',
    role: 'student', // You can change this for admin, teacher etc.
  });

   const [showField, setShowField] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registered successfully');
      navigate('/profile');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Register</h2>

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full mb-4 p-3 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full mb-4 p-3 border rounded" required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full mb-4 p-3 border rounded" required />
       {/* <input type="text" name="instituteName" placeholder="Institute Name" onChange={handleChange} className="w-full mb-4 p-3 border rounded" required /> */}
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-3 border rounded" required />

          {/* ✅ Checkbox */}
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={showField}
            onChange={(e) => setShowField(e.target.checked)}
          />
          <span className="text-sm">Are you from a school?</span>
        </label>

         <div
          className={`transition-all duration-300 overflow-hidden ${
            showField ? 'max-h-40 mt-2' : 'max-h-0'
          }`}
        >
          {showField && (
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              placeholder="Institute Name"
              className="w-full p-2 border rounded mt-2"
              required={showField}
            />
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default Register;
