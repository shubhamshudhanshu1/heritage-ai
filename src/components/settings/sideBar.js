"use client";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import CommonLabel from "../common/label";
import Tabs from "../common/tab";
import GlobalSettings from "./global";
import PageSettings from "./page";
import { useDispatch, useSelector } from "react-redux";
import {
  setSchemaEditMode,
  setScope,
  setTenant,
  setUserType,
} from "@/redux/slices/configSlice";
import { useSession } from "next-auth/react";
import useConfigFetcher from "@/hooks/useConfigFetcher";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const { tenant, userType, scope, page, schemaEditMode } = useSelector(
    (state) => state.config
  );
  const { config, error, loading } = useConfigFetcher(tenant, userType, scope);

  React.useEffect(() => {
    if (session.user.tenant) {
      dispatch(setTenant(session.user.tenant));
    }
  }, [session.user.tenant]);

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
          <MenuItem value="FOS"> FOS</MenuItem>
          <MenuItem value="Distributor">Distributor</MenuItem>
          <MenuItem value="Retailer">Retailer</MenuItem>
        </Select>
      </FormControl>
      {userType && (
        <>
          <Box className="pt-2">
            <div>
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    checked={schemaEditMode} // Use checked to bind the state
                    onChange={(e) => {
                      console.log(e.target.checked);
                      dispatch(setSchemaEditMode(e.target.checked));
                    }}
                  />
                }
                label="Edit Schema"
                labelPlacement="start"
              />
            </div>
            <Tabs
              tabs={tabs}
              value={scope}
              onChange={(newValue) => {
                dispatch(setScope(tabs[newValue]?.id));
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
