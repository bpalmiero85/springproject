import "../styles/Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import FetchUser from "../components/FetchUser";
import { useCookies } from "react-cookie";

function Navbar() {
  const { user, error } = FetchUser();
  const [, removeCookie] = useCookies(['user']);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    removeCookie('user');
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/login">Sign In</Link>
        <Link
          to={
            user.username ? `/homepage?username=${user.username}` : "/register"
          }
        >
          Home
        </Link>
        <Link to="/register">Register</Link>
        <Link to={`/logout?username=${user.username}`} onClick={handleLogout}>Sign Out</Link>
      </div>
    </div>
  );
}

export default Navbar;
