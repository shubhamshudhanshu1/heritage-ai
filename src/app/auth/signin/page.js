"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CommonLabel from "@/components/common/label";
import { fetchTenants, selectAllTenants } from "@/redux/slices/tenantSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenant, setTenant] = useState("");
  const dispatch = useDispatch();
  const tenants = useSelector(selectAllTenants);

  useEffect(() => {
    dispatch(fetchTenants());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
        tenant,
        callbackUrl: "/settings",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        Sign In
      </Typography>
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
      <FormControl fullWidth margin="normal" required>
        <CommonLabel>Tenant</CommonLabel>
        <Select
          labelId="tenant-select-label"
          name="tenant"
          value={tenant}
          onChange={(e) => setTenant(e.target.value)}
        >
          {tenants.map((tenant) => {
            return (
              <MenuItem key={tenant.tenantName} value={tenant.tenantName}>
                {tenant.tenantName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
        Sign In
      </Button>
    </Box>
  );
}
