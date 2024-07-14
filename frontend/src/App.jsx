import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import UserInfo from './pages/UserInfo';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import ActiveUsers from "./components/ActiveUsers";
import Navbar from './components/Navbar';



const App = () => {
  const location = useLocation();
  const hideNavbar = ['/register', '/', '/logout']
  return (
      <div>
        {!hideNavbar.includes(location.pathname) && <Navbar />} 
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/active-users" element={<ActiveUsers />} />
      </Routes>
      </div>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;
