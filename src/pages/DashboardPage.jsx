// src/pages/DashboardPage.jsx
import React from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  console.log("ssssssssssssssss", isAuthenticated);

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {"aaa"}</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default DashboardPage;
