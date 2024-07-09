import "../styles/Navbar.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from '../pages/UserInfo';
import { useCookies } from 'react-cookie';



function Navbar() {
  const [firstName, setFirstName] = useState(null);
  const [cookie, getCookie] = useCookies(["user"]);

  
useEffect(() => {
  console.log(cookie.fistName)
  setFirstName(cookie.firstName)

},[]);


  return (
    <div className="navbar">
      <div>
        <Link to="/login">Login</Link>
        <Link to="/homepage">Home</Link>
        <Link to="/logout">Sign Out</Link>
        <Link to="/register">Register</Link>
        
      </div>
    </div>
  );
}

export default Navbar;
