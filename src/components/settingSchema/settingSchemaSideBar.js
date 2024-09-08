"use client";
import React, { useState, useEffect } from "react";
import Tabs from "../common/tab";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettingSchemas } from "@/redux/slices/settingSchemaSlice";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import RenderSchema from "./renderSchema";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import CommonLabel from "../common/label";
import { useSession } from "next-auth/react";

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
  const [editingSchema, setEditingSchema] = useState(null);
  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const settings = useSelector((state) => state.settingSchema.data);
  const tenant = useSelector((state) => state.config.tenant);

  useEffect(() => {
    if (session.user.tenant) {
      dispatch(
        fetchSettingSchemas({
          tenantName: session.user.tenant,
          type: activeTab,
        })
      );
    }
  }, [session.user.tenant, activeTab, dispatch]);

  const handleTabChange = (newTab) => setActiveTab(newTab);

  const handleValueChange = (key, value) => {
    setEditingSchema((prevSchema) => ({
      ...prevSchema,
      [key]: value,
    }));
  };

  const handleAddNewItem = () => {
    setEditingSchema({
      name: "",
      type: activeTab,
      slug: "",
      tenant,
      settings: [],
    });
  };

  const handleDeleteItem = (index) => {
    // Implement deletion logic
  };

  const renderAddNewItemForm = () => (
    <div className="mt-4">
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleAddNewItem}
        sx={{ mt: 2 }}
      >
        Add {activeTab === "page" ? "Page" : "Section"}
      </Button>
    </div>
  );

  const renderTabContent = () => {
    return (
      <div className="mt-4">
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

  const renderTab = () => (
    <Tabs
      tabs={[
        { label: "Pages", content: renderTabContent(), id: "page" },
        { label: "Sections", content: renderTabContent(), id: "section" },
      ]}
      value={activeTab}
      onChange={handleTabChange}
    />
  );

  const renderEditingContent = () => (
    <div>
      <div className="flex flex-col gap-2 my-2 mb-4">
        <FormControl fullWidth required>
          <CommonLabel>Name</CommonLabel>
          <TextField
            fullWidth
            value={editingSchema?.name || ""}
            onChange={(e) => handleValueChange("name", e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth required>
          <CommonLabel>Slug</CommonLabel>
          <TextField
            fullWidth
            value={editingSchema?.slug || ""}
            onChange={(e) => handleValueChange("slug", e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth required>
          <CommonLabel>Route</CommonLabel>
          <TextField
            fullWidth
            value={editingSchema?.route || ""}
            onChange={(e) => handleValueChange("route", e.target.value)}
          />
        </FormControl>
      </div>
      <RenderSchema
        levelJson={editingSchema}
        path={[]}
        schemaEditMode={true}
        onChangeSettings={(newSettings) =>
          handleValueChange("settings", newSettings)
        }
      />
    </div>
  );

  return (
    <Box className="w-[350px] h-full bg-white shadow-lg flex flex-col overflow-y-auto">
      <SideBarHeader>
        {editingSchema ? (
          <div
            className="flex flex-row gap-3 items-center cursor-pointer"
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
        {editingSchema ? renderEditingContent() : renderTab()}
      </div>
      <SideBarFooter>
        <Button variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </SideBarFooter>
    </Box>
  );
};

export default Sidebar;
