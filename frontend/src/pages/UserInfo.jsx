import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/UserInfo.css";

const UserInfo = () => {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user/userinfo?username=${username}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setError("Error fetching user info");
        }
      } catch (error) {
        setError("Error fetching user info");
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  const handleEdit = (field) => {
    setIsEdit((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field) => {
    try {
      const response = await fetch("http://localhost:8080/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, [field]: user[field] }),
        credentials: "include",
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEdit((prev) => ({ ...prev, [field]: false }));
      } else {
        setError("Error updating user info");
      }
    } catch (error) {
      setError("Error updating user info");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info-page-container">
      <h1 className="user-info-header">User Info</h1>
      <div className="user-info-box">
        <div className="user-info-field-inputs">
          <div className="user-info-field">
            <strong>First Name:</strong>
            {isEdit.firstName ? (
              <input
                type="text"
                value={user.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            ) : (
              <span>{user.firstName}</span>
            )}
            <button
              className="user-edit-button"
              onClick={(e) =>
                isEdit.firstName
                  ? handleSave("firstName")
                  : handleEdit("firstName")
              }
            >
              {isEdit.firstName ? "Save" : "Edit"}
            </button>
          </div>
          <div className="user-info-field">
            <strong>Last Name:</strong>
            {isEdit.lastName ? (
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            ) : (
              <span>{user.lastName}</span>
            )}
            <button
              className="user-edit-button"
              onClick={(e) =>
                isEdit.lastName
                  ? handleSave("lastName")
                  : handleEdit("lastName")
              }
            >
              {isEdit.lastName ? "Save" : "Edit"}
            </button>
          </div>
          <div className="user-info-field">
            <strong>Email:</strong>
            {isEdit.email ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              <span>{user.email}</span>
            )}
            <button
              className="user-edit-button"
              onClick={(e) =>
                isEdit.email ? handleSave("email") : handleEdit("email")
              }
            >
              {isEdit.email ? "Save" : "Edit"}
            </button>
          </div>
          <div className="user-info-field">
            <strong>Username:</strong>
            <span>{user.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
