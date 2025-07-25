// frontend/src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDash from './pages/student/StudentDash';
import CoursePage from './pages/CoursePage';
import {ShopContextProvider} from './context/shopcontext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndCondition.js';
import Profile from './pages/Profile.js';
import CourseDetail from './pages/CourseDetail.js';



function App() {
  // 1️⃣  <BrowserRouter> listens for URL changes (Single-Page-App).
  return (
    
    <BrowserRouter>
      <ShopContextProvider>
      {/* 2️⃣  <Routes> chooses exactly one <Route> to render. */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/courses" element={<CoursePage/>}/>
        <Route path="/courses/:id" element={<CourseDetail/>}/>
        <Route path="/policy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<TermsAndConditions/>}/>


        {/* 3️⃣  Three isolated entry points – one per user role. */}
        <Route path="/student/*" element={<StudentDash />} />
        <Route path="/profile" element={<Profile />} />


        
      </Routes>
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
