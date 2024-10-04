"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import CommonLabel from "@/components/common/label";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // Default to email

  const sendOtp = async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber: mobile }),
      });
      if (response.ok) {
        setIsOtpSent(true);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while sending OTP");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (loginMethod === "email") {
      // Email and password sign-in
      try {
        const res = await signIn("credentials", {
          redirect: false, // Change to false for manual handling
          email,
          password,
        });
        if (!res.ok) {
          setError(res.error); // Show error message
        } else {
          // Successful sign-in, redirect to desired page
          window.location.href = "/"; // Redirect manually after successful sign-in
        }
      } catch (err) {
        console.log(err);
        setError("Invalid login credentials");
      }
    } else {
      // Mobile and OTP sign-in
      if (!isOtpSent) {
        sendOtp(); // Send OTP
      } else {
        // Verify OTP
        try {
          const res = await signIn("credentials", {
            redirect: false, // Change to false for manual handling
            mobile,
            otp,
          });

          if (!res.ok) {
            setError(res.error); // Show error message
          } else {
            // Successful sign-in, redirect to desired page
            window.location.href = "/"; // Redirect manually after successful sign-in
          }
        } catch (err) {
          console.log(err);
          setError("OTP verification failed");
        }
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignIn}
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
        {loginMethod === "email" ? "Sign In with Email" : "Sign In with Mobile"}
      </Typography>

      {loginMethod === "email" ? (
        <>
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
        </>
      ) : (
        <>
          <CommonLabel>Mobile Number</CommonLabel>
          <TextField
            name="mobile"
            type="tel"
            fullWidth
            margin="normal"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={isOtpSent} // Disable input after OTP is sent
          />
          {isOtpSent && (
            <>
              <CommonLabel>OTP</CommonLabel>
              <TextField
                name="otp"
                type="text"
                fullWidth
                margin="normal"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}
          {!isOtpSent && (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={sendOtp} // Trigger sending OTP
            >
              Send OTP
            </Button>
          )}
        </>
      )}

      {error && <Typography color="error">{error}</Typography>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {loginMethod === "email" ? "Sign In" : "Verify OTP & Sign In"}
      </Button>

      <Button
        variant="text"
        fullWidth
        onClick={() =>
          setLoginMethod(loginMethod === "email" ? "mobile" : "email")
        }
        sx={{ mt: 1 }}
      >
        {loginMethod === "email"
          ? "Sign in with Mobile and OTP"
          : "Sign in with Email and Password"}
      </Button>

      <Button variant="text" fullWidth href="/auth/register" sx={{ mt: 1 }}>
        Don't have an account? Register
      </Button>
    </Box>
  );
}
