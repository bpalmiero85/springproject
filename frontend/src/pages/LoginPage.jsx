import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [, setCookie] = useCookies(["user"]);

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setCookie("user", username);

        setCookie("user", username, { path: "/" });

        navigate(`/homepage?username=${username}`);
      } else {
        const errorText = await response.text();
        console.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-title">
        <h2>Login</h2>
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="login-fields">
            <div className="login-username">
              <label className="login-label">Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </div>
            <div className="login-password">
              <label className="login-label">Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>
            <div className="login-label">
            <button
              type="submit"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </button>
              <button 
                type="button"
                className="login-button"
                onClick={handleRegister}
            >
            Sign up
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
