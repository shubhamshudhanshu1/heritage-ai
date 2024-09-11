// components/FileInput.js
import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FileInput = ({ control, name, label, errors }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange } }) => (
      <TextField
        type="file"
        label={label}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => onChange(e.target.files)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        className="w-full mb-4"
      />
    )}
  />
);

export default FileInput;
