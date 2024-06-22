// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

const App = () => {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <AuthProvider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthOutlet fallbackPath="/login?redirect=true" />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
