"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import CommonLabel from "@/components/common/label";
import { selectAllTenants } from "@/redux/slices/tenantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For registration
  const [isRegister, setIsRegister] = useState(false); // Toggle between login/register
  const dispatch = useDispatch();
  const tenants = useSelector(selectAllTenants);

  useEffect(() => {
    // dispatch(fetchTenants());
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/settings",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name, // Send name for registration
        }),
      });
      if (response.ok) {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/settings",
        });
      } else {
        console.log("Registration failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={isRegister ? handleRegister : handleSignIn}
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
        {isRegister ? "Register" : "Sign In"}
      </Typography>
      {isRegister && (
        <>
          <CommonLabel>Name</CommonLabel>
          <TextField
            name="name"
            type="text"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </>
      )}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {isRegister ? "Register" : "Sign In"}
      </Button>
      <Button
        variant="text"
        fullWidth
        onClick={() => setIsRegister(!isRegister)}
        sx={{ mt: 1 }}
      >
        {isRegister
          ? "Already have an account? Sign In"
          : "Don't have an account? Register"}
      </Button>
    </Box>
  );
}
