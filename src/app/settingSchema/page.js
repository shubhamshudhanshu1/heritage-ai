"use client";
import SettingSchemaSidebar from "@/components/settingSchema/settingSchemaSideBar";
import { fetchSettingSchemas } from "@/redux/slices/settingSchemaSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Schema() {
  const { data: session = { user: {} } } = useSession();

  const dispatch = useDispatch();
  useEffect(() => {
    if (session.user.tenant)
      dispatch(fetchSettingSchemas({ tenantName: session.user.tenant }));
  }, [session.user.tenant]);
  return <SettingSchemaSidebar />;
}

export default Schema;
