// src/components/Navbar.js
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(false); // disable scroll effect on other pages
    }
  }, [isHomePage]);

  const navbarClass = isHomePage
    ? scrolled
      ? "navbar scrolled"
      : "navbar transparent"
    : "navbar white";

  return (
    <nav className={navbarClass}>
      <div className="navbar-container">
      <div className="nav-left">
        <Link to="/" className="logo">EdVengers</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
