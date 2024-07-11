import React from "react";
import { useState } from "react";
import "../styles/UserInfo.css";
import useFetchUser from "../components/FetchUser";

const UserInfo = () => {
  const { user, error } = useFetchUser();
  const [editFields, setEditFields] = useState({});
  const [editUser, setEditUser] = useState({});

  const handleEdit = (field) => {
    setEditFields({ ...editFields, [field]: true });
    setEditUser({ ...editUser, [field]: user[field] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSave = async (field) => {
    try {
      const response = await fetch("`http://localhost:8080/user/update", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...user, [field]: editUser[field] }),
      });

      if (response.ok) {
        setEditFields({ ...editFields, [field]: false });
        user[field] = editUser[field];
      }
    } catch (error) {
      console.error("Error updating user information", error);
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
      <h1 className="user-info-header">User Information</h1>
      <div className="user-info-box">
        {["username", "email", "firstName", "lastName"].map((field) => (
          <div className="user-info-field" key={field}>
            <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
            {editFields[field] ? (
              <>
                <input
                  className="user-info-field-inputs"
                  type="text"
                  name={field}
                  value={editUser[field] || ""}
                  onChange={handleChange}
                />
                <button
                  className="save-button"
                  onClick={() => handleSave(field)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{user[field]}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(field)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
