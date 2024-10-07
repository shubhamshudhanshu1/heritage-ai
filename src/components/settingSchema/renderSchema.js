import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addSettings,
  deleteSettings,
  editSettings,
  overrideSettings,
  addOrUpdateProp,
  deleteProp,
} from "@/redux/slices/configSlice";
import SettingsRenderer from "../common/settingsRenderer";
import AddSchema from "./AddSchema";

function RenderSchema({
  levelJson = {},
  onChangeSettings = () => {},
  onChangeProp = () => {},
  path = [],
  schemaEditMode = false,
  disableAdd = false,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSchemaIndex, setActiveSchemaIndex] = useState(null);
  const dispatch = useDispatch();
  const { settings = [], props = {} } = levelJson;

  const handleAddSchema = (newSchema) => {
    dispatch(addSettings({ path, newSetting: newSchema }));
    onChangeSettings([...settings, newSchema]);
  };

  const editSchema = (editedSchema) => {
    if (activeSchemaIndex !== null) {
      const updatedSettings = settings.map((setting, index) =>
        index === activeSchemaIndex ? editedSchema : setting
      );
      dispatch(
        editSettings({
          path,
          index: activeSchemaIndex,
          updatedSetting: editedSchema,
        })
      );
      onChangeSettings(updatedSettings);
    }
  };

  const handleDeleteSetting = (index) => {
    const updatedSettings = settings.filter((_, i) => i !== index);
    dispatch(deleteSettings({ path, index }));
    onChangeSettings(updatedSettings);
  };

  const handleOverrideSettings = (newSettings) => {
    dispatch(overrideSettings({ path, settings: newSettings }));
    onChangeSettings(newSettings);
  };

  const handleAddOrUpdateProp = (propKey, propValue) => {
    const updatedProps = { ...props, [propKey]: propValue };
    dispatch(addOrUpdateProp({ path, propKey, propValue }));
    onChangeProp(updatedProps);
  };

  const handleDeleteProp = (propKey) => {
    const { [propKey]: _, ...updatedProps } = props;
    dispatch(deleteProp({ path, propKey }));
    onChangeProp(updatedProps);
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
        readOnly={false}
      />
      {disableAdd ? null : (
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

export default RenderSchema;
