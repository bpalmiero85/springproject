import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserInfo from "./pages/UserInfo";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LogoutPage from "./pages/LogoutPage";
import ActiveUsers from "./components/ActiveUsers"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/active-users" element={<ActiveUsers />} /> 
      </Routes>
    </Router>
  );
};

export default App;
