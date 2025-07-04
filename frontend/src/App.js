// frontend/src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDash from './pages/admin/AdminDash';
import TeacherDash from './pages/teacher/TeacherDash';
import StudentDash from './pages/student/StudentDash';
import CoursePage from './pages/CoursePage';
import ShopContextProvider from './context/shopcontext';
import CourseContent from './pages/student/CourseContent';
import CourseLevels from './pages/student/CourseLevels';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndCondition.js';


function App() {
  // 1️⃣  <BrowserRouter> listens for URL changes (Single-Page-App).
  return (
    <ShopContextProvider>
    <BrowserRouter>
      {/* 2️⃣  <Routes> chooses exactly one <Route> to render. */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/courses/:courseId" element={<CoursePage/>}/>
        <Route path="/courses/:courseId/levels" element={<CourseLevels />} />
        <Route path="/courses/:courseId/level/learn" element={<CourseContent />} />
        <Route path="/policy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<TermsAndConditions/>}/>


        {/* 3️⃣  Three isolated entry points – one per user role. */}
        <Route path="/admin/*" element={<AdminDash />} />
        <Route path="/teacher/*" element={<TeacherDash />} />
        <Route path="/student/*" element={<StudentDash />} />

        {/* 4️⃣  Root path simply redirects to a login page (add later). */}
        <Route path="/" element={<Navigate to="/student" />} />

        {/* 5️⃣  Catch - all 404 page.
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    </ShopContextProvider>
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
