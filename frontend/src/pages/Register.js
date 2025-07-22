import React, { useState, useContext} from "react";
import { ShopContext } from "../context/shopcontext"; // Adjust the path if needed

const Register = () => {
  const { register } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    instituteName: "",
    email: "",
    password: "",
    role: "student", // Default role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
    } catch (err) {
      console.error("Register failed", err);
    } finally {
      setLoading(false);
    }
  };

   const isStudentOrTeacher = formData.role === "student" || formData.role === "teacher";
  const isInstitute = formData.role === "institute";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

        {/* Role */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="institute">Institute</option>
          </select>
        </div>

        {/* Name (not required for institute) */}
        {isStudentOrTeacher && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Your name"
            />
          </div>
        )}

                {/* Institute Name Field for Institute */}
        {isInstitute && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Institute Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Institute name"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="example@email.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
