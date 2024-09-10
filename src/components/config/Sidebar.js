"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import SidebarHeader from "../common/sidebarHeader";
import SidebarFooter from "../common/sidebarFooter";
import TabContent from "./TabContent";
import EditingForm from "./EditingForm";
import DeleteConfirmationModal from "../common/deleteConfirmationModal";
import Tabs from "../common/tab";
import {
  deleteSettingSchema,
  fetchSettingSchemas,
  saveSettingSchema,
} from "@/redux/slices/settingSchemaSlice";
import { FormControl, MenuItem, Select } from "@mui/material";
import CommonLabel from "../common/label";
import { fetchTenantByFilters } from "@/redux/slices/tenantSlice";
import { fetchConfig, setUserType } from "@/redux/slices/configSlice";

const SettingSchemaSidebar = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [editingSchema, setEditingSchema] = useState({
    slug: "global",
    name: "global",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { userType, config } = useSelector((state) => state.config);
  const { currentTenantDetails } = useSelector((state) => state.tenants);
  let userTypes = currentTenantDetails.userTypes || [];
  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const {
    data: settings,
    loading: fetchingSchema,
    schemaMap,
  } = useSelector((state) => state.settingSchema);
  let tenantName = session.user?.tenant;
  const isGlobal = activeTab === "global";
  const isEditing = editingSchema !== null && !isGlobal;
  const isPage = activeTab === "page";
  const isBlock = activeTab === "block";

  let globalConfig = config.props;

  console.log({ schemaMap });
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

  const handleTabChange = (newTab) => {
    setEditingSchema(null);
    setActiveTab(newTab);
  };

  const handleValueChange = (key, value) => {
    setEditingSchema((prevSchema) => ({
      ...prevSchema,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    if (isGlobal) {
      return true;
    }
    return editingSchema?.name && editingSchema?.slug;
  };

  const onSaveSchema = () => {
    if (!isFormValid()) {
      toast.error("Please fill all required fields.");
      return;
    }

    let payload = editingSchema;

    if (isGlobal) {
      payload = {
        tenantName: session.user.tenant,
        slug: "global",
        name: "global",
        type: activeTab,
        ...settings[0],
        ...editingSchema,
      };
    }

    dispatch(saveSettingSchema(payload))
      .then(() => {
        fetchSchemas(tenantName);
        setEditingSchema(null);
        toast.success("Updated successfully!");
      })
      .catch(() => toast.error("Failed to update."));
  };

  const fetchSchemas = (tenantName) => {
    dispatch(fetchSettingSchemas({ tenantName }));
  };

  const handleAddNewItem = () => {
    setEditingSchema({
      name: "",
      type: activeTab,
      tenantName: tenantName,
      slug: "",
      settings: [],
    });
  };

  const handleDeleteItem = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteItem = () => {
    dispatch(deleteSettingSchema(deleteItemId))
      .then(() => fetchSchemas(tenantName))
      .catch(() => toast.error("Failed to delete"));
    setDeleteModalOpen(false);
  };

  // console.log({ config });

  console.log(
    schemaMap[editingSchema?.name]?.[editingSchema?.slug]?.settings,
    "sfsfs"
  );
  const renderTabContent = () => {
    if (fetchingSchema) {
      return <div className="mt-4">Fetching...</div>;
    }
    return (
      <div className="mt-4">
        {isEditing ? (
          <EditingForm
            editingSchema={editingSchema}
            showRouteInput={isPage}
            handleValueChange={handleValueChange}
            disableBlockAdd={isBlock}
          />
        ) : (
          <TabContent
            settings={
              schemaMap[editingSchema?.name]?.[editingSchema?.slug]?.settings
            }
            activeTab={activeTab}
            onEdit={(item) => setEditingSchema(item)}
            onDelete={handleDeleteItem}
            onAddNew={handleAddNewItem}
            isGlobal={isGlobal}
            editingSchema={editingSchema}
            handleValueChange={handleValueChange}
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-[400px] h-screen bg-slate-100 shadow-lg flex flex-col">
      <SidebarHeader
        title={(editingSchema && editingSchema.name) || "Configurations"}
        isEditing={isEditing}
        activeTab={activeTab}
        onBackClick={() => setEditingSchema(null)}
      />
      {isEditing ? null : (
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
      )}
      {userType && (
        <div className="flex-grow overflow-y-auto p-4">
          {isEditing ? (
            renderTabContent()
          ) : (
            <Tabs
              tabs={[
                {
                  label: "Global",
                  content: renderTabContent(),
                  id: "global",
                },
                { label: "Pages", content: renderTabContent(), id: "page" },
              ]}
              value={activeTab}
              onChange={handleTabChange}
            />
          )}
        </div>
      )}
      {userType && (
        <SidebarFooter
          isEditing={isEditing}
          onSave={onSaveSchema}
          isFormValid={isFormValid()}
          text={
            isEditing ? "Save Changes" : isGlobal ? "Save Global Settings" : ""
          }
        />
      )}

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteItem}
      />
    </div>
  );
};

export default SettingSchemaSidebar;
