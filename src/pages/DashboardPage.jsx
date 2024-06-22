// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

const DashboardPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const token = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  console.log("isAuthenticated", isAuthenticated);

  console.log("ssssssssss", data);

  useEffect(() => {
    getData();
  }, []);

  console.log("ssssssssssssssss", token);

  const getData = async () => {
    try {
      const response = await axios
        .create({
          baseURL: "http://localhost:7000/flowapi",
          responseType: "json",
        })
        .get("/agent", {
          headers: {
            Authorization: token,
          },
        });
      const { data } = response;
      setData(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {auth?.username}</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default DashboardPage;
