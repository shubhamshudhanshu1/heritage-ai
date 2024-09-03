"use client";
import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import CommonLabel from "../common/label";
import Tabs from "../common/tab";
import GlobalSettings from "./global";
import PageSettings from "./page";
import { useDispatch, useSelector } from "react-redux";
import { setScope, setUserType } from "@/redux/slices/configSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userType, scope, page } = useSelector((state) => state.config);

  // const [userType, setUserType] = useState("");
  const tabs = [
    {
      label: "Global Setting",
      content: <GlobalSettings />,
      id: "global",
    },
    {
      label: "Page Setting",
      content: <PageSettings />,
      id: "page",
    },
  ];
  return (
    <Box className="w-[400px] bg-white shadow-lg flex flex-col overflow-scroll py-4">
      <FormControl fullWidth margin="normal" required className="px-4">
        <CommonLabel>User Type</CommonLabel>
        <Select
          labelId="tenant-select-label"
          name="User Type"
          value={userType}
          onChange={(e) => dispatch(setUserType(e.target.value))}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="tenant1"> FOS</MenuItem>
          <MenuItem value="tenant2">Distributor</MenuItem>
          <MenuItem value="tenant3">Retailer</MenuItem>
        </Select>
      </FormControl>
      {userType && (
        <Box className="pt-2">
          <Tabs
            tabs={tabs}
            value={scope}
            onChange={(val) => {
              dispatch(setScope(val));
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
