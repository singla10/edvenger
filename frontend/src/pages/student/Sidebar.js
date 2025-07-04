import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../../context/shopcontext";
import "../../Styles/Sidebar.css";

const Sidebar = () => {
    const { logout } = useContext(ShopContext);
  const navigate = useNavigate();

    const handleLogout = () => {
    logout(); // This clears localStorage and redirects to /login
  };

  return (
    <aside className="sidebar">
      <h2>STEM Learn</h2>
      <nav>
        <ul>
          <li> <Link className= "sidebar-link" to="/">🏠 Home</Link> </li>
          <li>📚 My Subjects</li>
          <li>🧪 Practice</li>
          <li>📜 Certificates</li>
          <li>🤖 STEM Playground</li>
          <li>👤 Profile</li>
                    <li onClick={handleLogout} style={{  cursor: "pointer" }}>
            🚪 Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
