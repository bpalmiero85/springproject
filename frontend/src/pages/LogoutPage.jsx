import React from "react";
import Navbar from "../components/Navbar";
import "../styles/LogoutPage.css";
import FetchUser from "../components/FetchUser";

const LogoutPage = () => {
  const { user, error } = FetchUser();


  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="logout-container">
      <Navbar />
      <div className="logout-message">
        <h3>
          We hope to see you again soon, <span>{user.firstName}</span>. Goodbye!
        </h3>
      </div>
    </div>
  );
};

export default LogoutPage;
