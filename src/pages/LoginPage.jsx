// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  const PATH = import.meta.env.VITE_API_PATH_SOCKET;
  console.log("sssssssssss", PATH);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
