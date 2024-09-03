"use client";
import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CommonLabel from "../common/label";
import SettingsTabs from "./tabs";

const Sidebar = () => {
  const [userType, setUserType] = useState("");
  return (
    <Box className="w-[400px] bg-white shadow-lg flex flex-col overflow-scroll py-4">
      <FormControl fullWidth margin="normal" required className="px-4">
        <CommonLabel>User Type</CommonLabel>
        <Select
          labelId="tenant-select-label"
          name="User Type"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="tenant1"> FOS</MenuItem>
          <MenuItem value="tenant2">Distributor</MenuItem>
          <MenuItem value="tenant3">Retailer</MenuItem>
        </Select>
      </FormControl>
      <Box className="pt-2">
        <SettingsTabs />
      </Box>
    </Box>
  );
};

export default Sidebar;
