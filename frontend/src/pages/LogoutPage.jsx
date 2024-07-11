import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutPage.css";
import useFetchUser from "./components/FetchUser";

const LogoutPage = () => {
  const { user, error } = useFetchUser();
  const navigate = useNavigate();

  navigate(`/logout?username=${user.username}`)



  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
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
