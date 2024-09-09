import React from "react";
import { TextField, FormControl } from "@mui/material";
import RenderSchema from "./RenderSchema";
import CommonLabel from "../common/label";

const EditingForm = ({ editingSchema, handleValueChange, showRouteInput }) => {
  return (
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
        {showRouteInput && (
          <FormControl fullWidth required>
            <CommonLabel>Route</CommonLabel>
            <TextField
              fullWidth
              value={editingSchema?.route || ""}
              onChange={(e) => handleValueChange("route", e.target.value)}
            />
          </FormControl>
        )}
      </div>
      <CommonLabel className="mb-2">Settings</CommonLabel>
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
};

export default EditingForm;
