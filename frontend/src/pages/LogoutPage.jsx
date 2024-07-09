import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/LogoutPage.css";

const Logout = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/userinfo?username=${username}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const userData = await response.json();
                   setUser(userData);
                   navigate(`/logout?username=${username}`)
                } else {
                    const errorMessage = `Error fetching user info: ${response.statusText}`;
                  
                    setError(errorMessage);
                }
            } catch (error) {
                const errorMessage = `Error fetching user info: ${error.message}`;
                
                setError(errorMessage);
            }
        };

        if (username) {
            fetchUser();
        } else {
            setError('Username parameter is missing');
        }
    }, [username]);

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
                {user && <h3>We hope to see you again soon, <span>{user.firstName}</span>. Goodbye!</h3>}
            </div>
        </div>
    );
};

export default Logout;
