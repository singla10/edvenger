import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(() => {
    // Initialize with current scroll position to prevent flash
    return isHomePage ? window.scrollY > 50 : false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      // Set initial state immediately to prevent flash
      setScrolled(window.scrollY > 50);

      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(false); // disable scroll effect on other pages
    }
  }, [isHomePage]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll to top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navbarClass = isHomePage
    ? scrolled
      ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20"
      : "bg-transparent"
    : "bg-white shadow-lg border-b border-gray-200";

  const textColorClass =
    isHomePage && !scrolled ? "text-white" : "text-slate-700";

  const logoColorClass =
    isHomePage && !scrolled ? "text-white" : "text-slate-800";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${navbarClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className={`text-2xl lg:text-3xl font-bold transition-colors duration-300 ${logoColorClass}`}
        >
          <Link
            to="/"
            className="hover:scale-105 transform transition-transform duration-200 inline-block"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
              Stem
            </span>
            <span className={logoColorClass}>Elix</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/"
                ? "border-b-2 border-blue-500 pb-1"
                : "hover:text-blue-600 hover:border-b-2 hover:border-blue-500 hover:pb-1"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/about"
                ? "border-b-2 border-blue-500 pb-1"
                : "hover:text-blue-600 hover:border-b-2 hover:border-blue-500 hover:pb-1"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/contact"
                ? "border-b-2 border-blue-500 pb-1"
                : "hover:text-blue-600 hover:border-b-2 hover:border-blue-500 hover:pb-1"
            }`}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className={`text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${textColorClass} ${
              location.pathname === "/login"
                ? "border-b-2 border-blue-500 pb-1"
                : "hover:text-blue-600 hover:border-b-2 hover:border-blue-500 hover:pb-1"
            }`}
          >
            Login
          </Link>

          {/* Enhanced Sign Up Button */}
          <Link
            to="/register"
            className={`inline-flex items-center px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              isHomePage && !scrolled
                ? "bg-white text-slate-800 hover:bg-blue-50 shadow-md"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors duration-200 ${textColorClass} hover:bg-gray-100/20`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        } ${
          isHomePage && !scrolled
            ? "bg-slate-900/95 backdrop-blur-md"
            : "bg-white/95 backdrop-blur-md"
        } border-t border-gray-200/20`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link
            to="/"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/"
                ? "text-blue-500"
                : "hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/about"
                ? "text-blue-500"
                : "hover:text-blue-600"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/contact"
                ? "text-blue-500"
                : "hover:text-blue-600"
            }`}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className={`block text-lg font-semibold transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-white" : "text-slate-700"
            } ${
              location.pathname === "/login"
                ? "text-blue-500"
                : "hover:text-blue-600"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
