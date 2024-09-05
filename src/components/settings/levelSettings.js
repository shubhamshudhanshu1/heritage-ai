import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSettings,
  deleteSettings,
  editSettings,
  overrideSettings,
  addOrUpdateProp,
  deleteProp,
} from "@/redux/slices/configSlice";
import SettingsRenderer from "@/components/common/settingsRenderer";
import AddSchema from "./addSchema";

function LevelSettings({ levelJson, path = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSchemaIndex, setActiveSchemaIndex] = useState(null); // Track the active schema index for editing
  const dispatch = useDispatch();
  const { schemaEditMode } = useSelector((state) => state.config);
  const { settings = [], props = {} } = levelJson;

  // Add new schema settings
  const handleAddSchema = (newSchema) => {
    dispatch(addSettings({ path, newSetting: newSchema }));
  };

  // Edit an existing schema at the selected index
  const editSchema = (editedSchema) => {
    if (activeSchemaIndex !== null) {
      dispatch(
        editSettings({
          path,
          index: activeSchemaIndex,
          updatedSetting: editedSchema,
        })
      );
    }
  };

  // Delete schema settings by index
  const handleDeleteSetting = (index) => {
    dispatch(deleteSettings({ path, index }));
  };

  // Override entire settings array
  const handleOverrideSettings = (newSettings) => {
    dispatch(overrideSettings({ path, settings: newSettings }));
  };

  // Add or update a prop
  const handleAddOrUpdateProp = (propKey, propValue) => {
    dispatch(addOrUpdateProp({ path, propKey, propValue }));
  };

  // Delete a prop by key
  const handleDeleteProp = (propKey) => {
    dispatch(deleteProp({ path, propKey }));
  };

  return (
    <div>
      <SettingsRenderer
        settings={settings}
        props={props}
        onEdit={(schemaIndex) => {
          setActiveSchemaIndex(schemaIndex); // Set active index for editing
          setModalOpen(true); // Open modal to edit
        }}
        onDelete={(schemaIndex) => {
          handleDeleteSetting(schemaIndex); // Delete selected schema
        }}
        onChangeSettings={(newSettings) => {
          handleOverrideSettings(newSettings); // Override all settings
        }}
        onChangeProp={(key, value) => {
          handleAddOrUpdateProp(key, value); // Add or update prop
        }}
        onDeleteProp={(key) => {
          handleDeleteProp(key); // Delete prop by key
        }}
      />
      {schemaEditMode && (
        <div className="mt-4">
          <AddSchema
            defaultSchema={settings[activeSchemaIndex] || {}} // Load schema for editing
            onAddSchema={handleAddSchema}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onEditSchema={editSchema} // Pass the edit handler
          />
        </div>
      )}
    </div>
  );
}

export default LevelSettings;
