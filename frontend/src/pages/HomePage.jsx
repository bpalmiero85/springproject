import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/HomePage.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user info for username: ${username}`);
        const response = await fetch(
          `http://localhost:8080/user/userinfo?username=${username}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const userData = await response.json();
          console.log("User Data:", userData);
          setUser(userData);
        } else {
          const errorMessage = `Error fetching user info: ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
        }
      } catch (error) {
        const errorMessage = `Error fetching user info: ${error.message}`;
        console.error(errorMessage);
        setError(errorMessage);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-message">
      <div className="home-header">
        <h2>Home</h2>
      </div>
      <Navbar />
      <p className="home-message">
        Hello, {user.firstName ? user.firstName : "Name unavailable"}! What
        would you like to do?
      </p>
    </div>
  );
};

export default HomePage;
