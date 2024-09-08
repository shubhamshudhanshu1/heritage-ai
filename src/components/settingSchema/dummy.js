"use client";
import React, { useState, useEffect } from "react";
import Tabs from "../common/tab";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { updateConfig } from "@/redux/slices/configSlice";
import { useSession } from "next-auth/react";
import { fetchSettingSchemas } from "@/redux/slices/settingSchemaSlice";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import RenderSchema from "./renderSchema";
import { Box, Button, Typography } from "@mui/material";

const SideBarFooter = ({ children }) => {
  return (
    <div className="sticky bottom-0 z-50 bg-white p-4 shadow-sm">
      {children}
    </div>
  );
};

const SideBarHeader = ({ children }) => {
  return (
    <div className="sticky top-0 z-50 bg-white p-4 shadow-sm">{children}</div>
  );
};
const Sidebar = (props) => {
  const [activeTab, setActiveTab] = useState("page");
  const [editingSchema, setEditingSchema] = useState("");
  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const { data: settings } = useSelector((state) => state.settingSchema);
  const { tenant } = useSelector((state) => state.config);

  useEffect(() => {
    if (session.user.tenant) {
      dispatch(
        fetchSettingSchemas({
          tenantName: session.user.tenant,
          type: activeTab,
        })
      );
    }
  }, [session.user.tenant, activeTab]);

  const handleTabChange = (newTab) => setActiveTab(newTab);

  const handleAddNewItem = () => {};

  const handleDeleteItem = (index) => {};

  return (
    <Box className="w-[400px] h-full bg-white shadow-lg flex flex-col overflow-y-auto">
      <SideBarHeader>
        {editingSchema ? (
          <div
            className="flex flex-row gap-3 items-center cursor-pointer "
            onClick={() => setEditingSchema(null)}
          >
            <ArrowBackIosNewOutlinedIcon />
            <Typography className="font-bold text-sm" variant="h6">
              Editing {activeTab}
            </Typography>
          </div>
        ) : (
          <Typography className="font-bold text-sm" variant="h6">
            Setting Schema
          </Typography>
        )}
      </SideBarHeader>
      <div className="p-4 flex-grow bg-slate-100">
        <SettingSchema {...props} />
      </div>
      <SideBarFooter>
        <Button variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </SideBarFooter>
    </Box>
  );
};
const SettingSchema = () => {
  const renderAddNewItemForm = () => (
    <div className="mt-4">
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => {
          setEditingSchema({
            name: "",
            type: activeTab,
            slug: "",
            tenant,
            settings: [],
          });
        }}
        sx={{ mt: 2 }}
      >
        Add {activeTab === "page" ? "Page" : "Section"}
      </Button>
    </div>
  );
  if (editingSchema) {
    return (
      <div>
        <div
          className="pb-4 flex flex-row gap-3 items-center cursor-pointer text-primary"
          onClick={() => setEditingSchema(null)}
        >
          <ArrowBackIosNewOutlinedIcon />
          <span className="border-b-2 border-primary">Editing {activeTab}</span>
        </div>
        <RenderSchema levelJson={editingSchema} path={[]} />
      </div>
    );
  }
  const renderTabContent = () => {
    return (
      <div>
        {settings.length ? (
          settings.map((setting, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="flex flex-row gap-2 items-center justify-between w-full bg-primary-50 p-4 rounded-sm"
            >
              <div className="flex flex-row gap-2 items-center">
                <DragIndicatorIcon />
                <div>{setting.label || `Item ${index + 1}`}</div>
              </div>
              <CloseOutlinedIcon
                onClick={() => handleDeleteItem(index)}
                className="cursor-pointer"
              />
            </div>
          ))
        ) : (
          <div>No {activeTab === "page" ? "Pages" : "Sections"} found.</div>
        )}
        {renderAddNewItemForm()}
      </div>
    );
  };
  return (
    <>
      <Tabs
        tabs={[
          { label: "Pages", content: renderTabContent(), id: "page" },
          { label: "Sections", content: renderTabContent(), id: "section" },
        ]}
        value={activeTab}
        onChange={handleTabChange}
      />
    </>
  );
};

export default Sidebar;
