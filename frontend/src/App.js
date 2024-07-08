import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserInfo from "./pages/UserInfo";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
