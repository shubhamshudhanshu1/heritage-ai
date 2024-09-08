"use client";
import SettingSchemaSidebar from "@/components/settingSchema/settingSchemaSideBar";
import { fetchSettingSchemas } from "@/redux/slices/settingSchemaSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Schema() {
  return <SettingSchemaSidebar />;
}

export default Schema;
