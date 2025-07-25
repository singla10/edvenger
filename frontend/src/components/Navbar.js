// src/components/Navbar.js
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";


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
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-600">
          <Link to="/">StemElix</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-sm md:text-base text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
