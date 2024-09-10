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

const SettingSchemaSidebar = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [editingSchema, setEditingSchema] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const dispatch = useDispatch();
  const { data: session = { user: {} } } = useSession();
  const { data: settings, loading: fetchingSchema } = useSelector(
    (state) => state.settingSchema
  );

  let tenantName = session.user?.tenant;

  const isGlobal = activeTab === "global";
  const isEditing = editingSchema !== null;
  const isPage = activeTab === "page";
  const isBlock = activeTab === "block";

  useEffect(() => {
    if (tenantName && activeTab) {
      fetchSchemas();
    }
  }, [tenantName, activeTab]);

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
        fetchSchemas();
        setEditingSchema(null);
        toast.success("Updated successfully!");
      })
      .catch(() => toast.error("Failed to update."));
  };

  const fetchSchemas = () => {
    dispatch(fetchSettingSchemas({ tenantName: tenantName, type: activeTab }));
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
      .then(() => fetchSchemas())
      .catch(() => toast.error("Failed to delete"));
    setDeleteModalOpen(false);
  };

  const renderTabContent = () => {
    if (fetchingSchema) {
      return <div className="mt-4">Fetching...</div>;
    }
    return (
      <div className="mt-4">
        {isEditing && !isGlobal ? (
          <EditingForm
            editingSchema={editingSchema}
            showRouteInput={isPage}
            handleValueChange={handleValueChange}
            disableBlockAdd={isBlock}
          />
        ) : (
          <TabContent
            settings={settings}
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
        title="Configurations"
        isEditing={isEditing}
        activeTab={activeTab}
        onBackClick={() => setEditingSchema(null)}
      />
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
              { label: "Sections", content: renderTabContent(), id: "section" },
              { label: "Blocks", content: renderTabContent(), id: "block" },
            ]}
            value={activeTab}
            onChange={handleTabChange}
          />
        )}
      </div>

      <SidebarFooter
        isEditing={isEditing}
        onSave={onSaveSchema}
        isFormValid={isFormValid()}
        text={
          isEditing ? "Save Changes" : isGlobal ? "Save Global Settings" : ""
        }
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteItem}
      />
    </div>
  );
};

export default SettingSchemaSidebar;
