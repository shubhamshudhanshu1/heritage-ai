"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import SidebarHeader from "../common/sidebarHeader";
import SidebarFooter from "../common/sidebarFooter";
import { fetchSettingSchemas } from "@/redux/slices/settingSchemaSlice";
import { FormControl, MenuItem, Select } from "@mui/material";
import CommonLabel from "../common/label";
import { fetchTenantByFilters } from "@/redux/slices/tenantSlice";
import {
  fetchConfig,
  setUserType,
  updateConfig,
} from "@/redux/slices/configSlice";
import Renderer from "./renderer";

const SettingSchemaSidebar = () => {
  const { data: session = { user: {} } } = useSession();
  const { schemaMap } = useSelector((state) => state.settingSchema);
  const { userType, config } = useSelector((state) => state.config);
  const { currentTenantDetails } = useSelector((state) => state.tenants);

  const dispatch = useDispatch();

  let userTypes = currentTenantDetails.userTypes || [];

  let tenantName = session.user?.tenant;

  useEffect(() => {
    if (tenantName && userType)
      dispatch(fetchConfig({ tenant: tenantName, userType }));
  }, [userType, tenantName]);

  useEffect(() => {
    if (tenantName) {
      fetchSchemas(tenantName);
      dispatch(fetchTenantByFilters({ tenantName }));
    }
  }, [tenantName]);

  const onSaveSchema = () => {
    dispatch(updateConfig());
  };

  const fetchSchemas = (tenantName) => {
    dispatch(fetchSettingSchemas({ tenantName }));
  };

  const renderUserTypeSelection = () => {
    return (
      <FormControl fullWidth margin="normal" required className="px-4">
        <CommonLabel>User Type</CommonLabel>
        <Select
          labelId="tenant-select-label"
          name="User Type"
          value={userType}
          onChange={(e) => dispatch(setUserType(e.target.value))}
        >
          {userTypes.map((ele) => {
            return <MenuItem value={ele.name}> {ele.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  console.log({ schemaMap });

  return (
    <div className="w-[400px] h-screen bg-slate-100 shadow-lg flex flex-col">
      <SidebarHeader title={"Configurations"} onBackClick={() => {}} />
      {renderUserTypeSelection()}
      <div className="flex-grow overflow-y-auto p-4">
        {userType ? (
          <Renderer
            rendererObject={{
              ...config,
              settings: schemaMap.global?.global?.settings || [],
            }}
            level="global"
            path={[]}
            schemaEditMode={false}
          />
        ) : null}
      </div>
      <SidebarFooter
        onSave={onSaveSchema}
        text={"Save Changes"}
        isFormValid={true}
      />
    </div>
  );
};

export default SettingSchemaSidebar;
