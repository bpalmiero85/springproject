import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setCookie] = useCookies(["user"]);
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const code = queryParams.get("code");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/verify?code=${code}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();
          setCookie("user", user.username, { path: "/" });
          navigate(`/welcome?username=${user.username}`);
        } else {
          const errorText = await response.text();
          console.error("Verification error:", errorText);
          navigate("/error");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        alert("Error verifying user:", error);
      }
    };

    if (code) {
      verifyUser();
    }
  }, [code, navigate, setCookie]);

  return (
    <div>
      <h2>Email Verification Required</h2>
      <p>Please check your email and click on the verification link to verify your account.</p>
      {username && <p>Username: {username}</p>}
    </div>
  );
};

export default VerificationPage;
