import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/UserInfo.css';


const UserInfo = () => {
    const location = useLocation();
    const username = new URLSearchParams(location.search).get('username');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Username:', username);
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/userinfo?username=${username}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log('User Data:', userData);
                    setUser(userData);
                } else {
                    setError('Error fetching user info');
                }
            } catch (error) {
                setError('Error fetching user info');
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
        <div className="user-info-page-container">
            <h1 className="user-info-header">User Info</h1>
            <div className="user-info-box">
                <div className="user-info-field-inputs">
                    <div className="user-info-field">
                        <strong>First Name:</strong> <span>{user.firstName}</span> <button className="edit-button">Edit</button>
                    </div>
                    <div className="user-info-field">
                        <strong>Last Name:</strong> <span>{user.lastName}</span> <button className="edit-button">Edit</button>
                    </div>
                    <div className="user-info-field">
                        <strong>Email:</strong> <span>{user.email}</span> <button className="edit-button">Edit</button>
                    </div>
                    <div className="user-info-field">
                        <strong>Username:</strong> <span>{user.username}</span> <button className="edit-button">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
