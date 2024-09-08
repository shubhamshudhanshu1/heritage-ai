import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSettings,
  deleteSettings,
  editSettings,
  overrideSettings,
  addOrUpdateProp,
  deleteProp,
  onChangeProp,
} from "@/redux/slices/configSlice";
import SettingsRenderer from "@/components/common/settingsRenderer";
import AddSchema from "../settingSchema/addSchema";

function LevelSettings({ levelJson, path = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSchemaIndex, setActiveSchemaIndex] = useState(null);
  const dispatch = useDispatch();
  const { schemaEditMode } = useSelector((state) => state.config);
  const { settings = [], props = {} } = levelJson;

  const handleAddSchema = (newSchema) => {
    dispatch(addSettings({ path, newSetting: newSchema }));
  };

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

  const handleDeleteSetting = (index) => {
    dispatch(deleteSettings({ path, index }));
  };

  const handleOverrideSettings = (newSettings) => {
    dispatch(overrideSettings({ path, settings: newSettings }));
  };

  const handleAddOrUpdateProp = (propKey, propValue) => {
    dispatch(addOrUpdateProp({ path, propKey, propValue }));
  };

  const handleDeleteProp = (propKey) => {
    dispatch(deleteProp({ path, propKey }));
  };

  return (
    <div>
      <SettingsRenderer
        settings={settings}
        props={props}
        schemaEditMode={schemaEditMode}
        onEdit={(schemaIndex) => {
          setActiveSchemaIndex(schemaIndex);
          setModalOpen(true);
        }}
        onDelete={(schemaIndex) => {
          handleDeleteSetting(schemaIndex);
        }}
        onChangeSettings={(newSettings) => {
          handleOverrideSettings(newSettings);
        }}
        onChangeProp={(key, value) => {
          handleAddOrUpdateProp(key, value);
        }}
        onDeleteProp={(key) => {
          handleDeleteProp(key);
        }}
      />
      {schemaEditMode && (
        <div className="mt-4">
          <AddSchema
            defaultSchema={settings[activeSchemaIndex] || {}}
            onAddSchema={handleAddSchema}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onEditSchema={editSchema}
          />
        </div>
      )}
    </div>
  );
}

export default LevelSettings;
