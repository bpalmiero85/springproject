import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from './pages/UserInfo';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import ActiveUsers from "./components/ActiveUsers";
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/active-users" element={<ActiveUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
