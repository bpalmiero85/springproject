import "../styles/Navbar.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import FetchUser from "../components/FetchUser";
import { useCookies } from "react-cookie";

function Navbar() {
  const { user, error } = FetchUser();
  const [, removeCookie] = useCookies(['user']);
  const location = useLocation();

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    removeCookie('user');
  };

  const showNavLinks = () => {
    switch (location.pathname) {
      case '/homepage':
        return (
          <>
            <Link to={`/logout?username=${user.username}`} onClick={handleLogout}>Sign Out</Link>
            <Link to={`/userinfo?username=${user.username}`} className="edit-profile-link">Edit Profile</Link>
          </>
        );
      case '/welcome':
        return (
          <>
            <Link to={user.username ? `/homepage?username=${user.username}` : "/register"}>Home</Link>
            <Link to={`/logout?username=${user.username}`} onClick={handleLogout}>Sign Out</Link>
            <Link to={`/userinfo?username=${user.username}`} className="edit-profile-link">Edit Profile</Link>
          </>
        );
        case '/userinfo':
          return (
            <>
              <Link to={user.username ? `/homepage?username=${user.username}` : "/register"}>Home</Link>
              <Link to={`/logout?username=${user.username}`} onClick={handleLogout}>Sign Out</Link>
            </>
          );
          case '/logout':
            return(
              <>
                <Link to="/">Sign In</Link>
              </>
            );
      default:
        return (
          <>
            <Link to="/">Sign In</Link>
          </>
        );
    } // end of switch
  };

  return (
    <div className="navbar">
      {showNavLinks()}
     </div>
  );
}

export default Navbar;
