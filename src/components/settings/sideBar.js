"use client";
import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import CommonLabel from "../common/label";
import { useDispatch, useSelector } from "react-redux";
import {
  setSchemaEditMode,
  setTenant,
  setUserType,
} from "@/redux/slices/configSlice";
import { useSession } from "next-auth/react";
import useConfigFetcher from "@/hooks/useConfigFetcher";
import Renderer from "./renderer";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const { tenant, userType, schemaEditMode, config } = useSelector(
    (state) => state.config
  );
  useConfigFetcher(tenant, userType);

  React.useEffect(() => {
    if (session.user.tenant) {
      dispatch(setTenant(session.user.tenant));
    }
  }, [session.user.tenant]);

  console.log({ config });
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
          <Box className="p-4">
            <div>
              <CommonLabel>Edit Schema</CommonLabel>
              <Switch
                color="primary"
                checked={schemaEditMode}
                onChange={(e) => {
                  dispatch(setSchemaEditMode(e.target.checked));
                }}
              />
            </div>
            <div>
              <Renderer
                object={config}
                level="global"
                path={[]}
                schemaEditMode={schemaEditMode}
              />
            </div>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
