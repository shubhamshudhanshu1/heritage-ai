import React from "react";
import AddSchema from "../addSchema";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { addSchemaToConfig, addSettings } from "@/redux/slices/configSlice";
import SettingsRenderer from "@/components/common/settingsRenderer";

function GlobalSettings() {
  const dispatch = useDispatch();
  const { config = {}, schemaEditMode } = useSelector((state) => state.config);
  const { settings = [], props = {} } = config;
  const handleAddSchema = (newSchema) => {
    dispatch(addSettings(newSchema));
  };

  return (
    <div>
      <SettingsRenderer settings={settings} props={props} />
      {schemaEditMode && (
        <div className="mt-4">
          <AddSchema onAddSchema={handleAddSchema} />
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
