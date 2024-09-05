import React, { useState } from "react";
import AddSchema from "../addSchema";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  addSchemaToConfig,
  addSettings,
  deleteSettings,
  editSettings,
  overrideSettings,
} from "@/redux/slices/configSlice";
import SettingsRenderer from "@/components/common/settingsRenderer";

// config {
//   settings
//   props
//   scope
//   tenant
//   usertype
// }

// config {
//   settings
//   props
//  path- config
//   scope
//   tenant
//   usertype
//   pages
// }

// home{
//   settings
//   props

//   sections:[
//    settings
//    props

//    blocks:[
//     settings
//     props
//    ]
//   ]

// }

function GlobalSettings() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSchema, setActiveSchema] = useState({});
  const dispatch = useDispatch();
  const { config = {}, schemaEditMode } = useSelector((state) => state.config);
  const { settings = [], props = {} } = config;

  const handleAddSchema = (newSchema) => {
    dispatch(addSettings(newSchema));
  };
  const editSchema = (editedSchema) => {
    dispatch(editSettings({ index: activeSchema, newSetting: editedSchema }));
  };

  return (
    <div>
      <SettingsRenderer
        settings={settings}
        props={props}
        onEdit={(schemaIndex) => {
          setActiveSchema(schemaIndex);
          setModalOpen(true);
        }}
        onDelete={(schemaIndex) => {
          dispatch(deleteSettings(schemaIndex));
        }}
        onChangeSettings={(settings) => {
          dispatch(overrideSettings(settings));
        }}
      />
      {schemaEditMode && (
        <div className="mt-4">
          <AddSchema
            defaultSchema={settings[activeSchema] || {}}
            onAddSchema={handleAddSchema}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            onEditSchema={editSchema}
          />
        </div>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(addSchemaToConfig());
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default GlobalSettings;
