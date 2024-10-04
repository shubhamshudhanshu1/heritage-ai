"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import CommonLabel from "@/components/common/label";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          mobileNumber,
        }),
      });
      if (response.ok) {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/settings",
        });
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred during registration");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Register
      </Typography>
      <CommonLabel>First Name</CommonLabel>
      <TextField
        name="firstName"
        type="text"
        fullWidth
        margin="normal"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <CommonLabel>Last Name</CommonLabel>
      <TextField
        name="lastName"
        type="text"
        fullWidth
        margin="normal"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <CommonLabel>Mobile Number</CommonLabel>
      <TextField
        name="mobileNumber"
        type="number"
        fullWidth
        margin="normal"
        required
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <CommonLabel>Email</CommonLabel>
      <TextField
        name="email"
        type="email"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CommonLabel>Password</CommonLabel>
      <TextField
        name="password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CommonLabel>Confirm Password</CommonLabel>
      <TextField
        name="confirmPassword"
        type="password"
        fullWidth
        margin="normal"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Register
      </Button>
      <Button variant="text" fullWidth href="/auth/signin" sx={{ mt: 1 }}>
        Already have an account? Sign In
      </Button>
    </Box>
  );
}
