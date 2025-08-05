// frontend/src/App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDash from "./pages/student/StudentDash";
import Contact from "./pages/Contact.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import About from "./pages/About.js";
import { ShopContextProvider } from "./context/shopcontext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition.js";
import Profile from "./pages/Profile.js";

// Component to handle layout with navbar spacing
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return <div className={isHomePage ? "" : "pt-16"}>{children}</div>;
};

function App() {
  // 1️⃣  <BrowserRouter> listens for URL changes (Single-Page-App).
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/about" element={<About />} />
            {/* 3️⃣  Three isolated entry points – one per user role. */}
            <Route path="/student/*" element={<StudentDash />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <Footer />
      </ShopContextProvider>
    </BrowserRouter>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
