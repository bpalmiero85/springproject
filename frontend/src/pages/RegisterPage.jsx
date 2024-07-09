import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        setCookie("user", username);
        navigate(`/welcome?username=${username}`);
      } else {
        const errorText = await response.text();
        console.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="register-background">
      <div className="register-title">
        <h2>Sign Up</h2>
      </div>
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <div className="register-fields">
            <div className="register-firstName">
              <label className="register-label">First Name: </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="register-input"
              />
            </div>
            <div className="register-lastName">
              <label className="register-label">Last Name: </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="register-input"
              />
            </div>
            <div className="register-email">
              <label className="register-label">Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
              />
            </div>
            <div className="register-username">
              <label className="register-label">Username: </label>
              <input
                type="text"
                value={username}
                minlength="3"
                onChange={(e) => setUsername(e.target.value)}
                className="register-input"
              />
            </div>
            <div className="register-password">
              <label className="register-label">Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
              />
            </div>
          </div>
          <div className="register-buttons">
            <button
              type="submit"
              className="register-button"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
