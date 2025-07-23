import { AdminProvider } from './context/AdminContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import AdminDash from './Pages/AdminDash';

const App = () => {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-dash" element={<AdminDash />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
};

export default App;

