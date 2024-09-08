"use client";
import React, { useState, useEffect } from "react";
import Tabs from "../common/tab";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSettingSchema,
  fetchSettingSchemas,
  saveSettingSchema,
} from "@/redux/slices/settingSchemaSlice";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import RenderSchema from "./renderSchema";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import CommonLabel from "../common/label";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("page");
  const [editingSchema, setEditingSchema] = useState(null);
  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const settings = useSelector((state) => state.settingSchema.data);
  const tenant = useSelector((state) => state.config.tenant);

  useEffect(() => {
    if (session.user.tenant && activeTab) {
      fetchSchemas(session.user.tenant, activeTab);
    }
  }, [session.user.tenant, activeTab, dispatch]);

  const handleTabChange = (newTab) => setActiveTab(newTab);

  const handleValueChange = (key, value) => {
    setEditingSchema((prevSchema) => ({
      ...prevSchema,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    return editingSchema?.name && editingSchema?.slug;
  };

  const onSaveSchema = () => {
    if (!isFormValid()) {
      toast.error("Please fill all required fields.");
      return;
    }
    dispatch(saveSettingSchema(editingSchema))
      .then(async (res) => {
        fetchSchemas();
        setEditingSchema(null);
        toast.success("Updated successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSchemas = (tenantName = session.user.tenant, type = activeTab) => {
    dispatch(
      fetchSettingSchemas({
        tenantName,
        type,
      })
    );
  };

  const handleAddNewItem = () => {
    setEditingSchema({
      name: "",
      type: activeTab,
      slug: "",
      tenantName: session.user.tenant,
      settings: [],
    });
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteSettingSchema(id)).then((res) => {
      toast.success("Deleted successfully!");
    });
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
      <div className="mt-4 flex flex-col gap-4">
        {settings.length ? (
          settings.map((item, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="flex flex-row gap-0 bg-white items-center w-full p-4 rounded-md"
            >
              <DragIndicatorIcon />
              <div className="w-full">{item.name}</div>
              <div className="flex flex-row gap-2">
                <EditNoteOutlinedIcon onClick={() => setEditingSchema(item)} />
                <CloseOutlinedIcon onClick={() => handleDeleteItem(item._id)} />
              </div>
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
        onChangeSettings={(newSettings) => {
          console.log({ newSettings });
          handleValueChange("settings", newSettings);
        }}
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
      {editingSchema ? (
        <SideBarFooter>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid()}
            onClick={() => onSaveSchema()}
          >
            Save Changes
          </Button>
        </SideBarFooter>
      ) : null}
    </Box>
  );
};

export default Sidebar;
