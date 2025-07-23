// admin/src/pages/AdminLogin.js
import { useState} from "react";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const { loginAdmin } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginAdmin(username, password);
    if (!success) {
      setError("Invalid credentials");
    } else {
      setError("");
      alert("Logged in as Admin!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => navigate('/admin-dash')}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
