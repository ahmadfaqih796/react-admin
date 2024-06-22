// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const LoginForm = () => {
  const isAuthenticated = useIsAuthenticated();
  console.log("aaaaaaaaaaaaaa", isAuthenticated);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios
        .create({
          baseURL: "http://localhost:7000/flowapi",
          responseType: "json",
        })
        .post("/login", {
          username,
          password,
        });
      const { data } = response;
      console.log("sssssssssssss", data);

      if (data) {
        signIn({
          auth: {
            token: data.Token,
          },
          userState: { ...data.data },
        });
        navigate("/dashboard");
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        fullWidth
        type="text"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginForm;
