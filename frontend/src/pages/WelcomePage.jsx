import React from "react";
import "../styles/WelcomePage.css";
import useFetchUser from "../components/FetchUser";

const WelcomePage = () => {
  const { user, error } = useFetchUser();

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="welcome-message">
      <h1 className="welcome-header">
        Welcome, <span>{user.firstName}</span>!
      </h1>
      <p>You now have access to this application.</p>
    </div>
  );
};

export default WelcomePage;
