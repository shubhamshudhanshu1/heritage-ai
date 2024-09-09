import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import RenderSchema from "./renderSchema";
import { SideBarFooter } from "./settingSchemaSideBar";

function GlobalSettings({ onSaveSchema, data }) {
  const [editingSchema, setEditingSchema] = useState({});

  useEffect(() => {
    handleValueChange("settings", data);
  }, [data]);

  const handleValueChange = (key, value) => {
    setEditingSchema((prevSchema) => ({
      ...prevSchema,
      [key]: value,
    }));
  };

  console.log({ editingSchema });
  return (
    <div className="mt-4">
      <RenderSchema
        levelJson={editingSchema}
        path={[]}
        schemaEditMode={true}
        onChangeSettings={(newSettings) => {
          console.log({ newSettings });
          handleValueChange("settings", newSettings);
        }}
      />
      <SideBarFooter>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onSaveSchema()}
        >
          Save Changes
        </Button>
      </SideBarFooter>
    </div>
  );
}

export default GlobalSettings;
