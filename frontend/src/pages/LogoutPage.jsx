import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/LogoutPage.css";
import useFetchUser from "../components/FetchUser";

const LogoutPage = () => {
  const { user, error } = useFetchUser();
  const [, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

useEffect(() => {
  const logoutUser = async () => {
    try {
      await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        credentials: "include",
      });
      removeCookie("user");
      navigate(`/logout?username=${user.username}`);
    } catch (error){
      console.error("Error logging out", error);
    }
  };

  logoutUser();
}, [removeCookie, navigate]);

if (error){
  return <div>{error}</div>;
}

if(!user) {
  return <div>Loading...</div>;
}

  return (
    <div className="logout-container">
      <div className="logout-message">
        <h3>
          We hope to see you again soon, <span>{user.firstName}</span>. Goodbye!
        </h3>
      </div>
    </div>
  );
};

export default LogoutPage;
