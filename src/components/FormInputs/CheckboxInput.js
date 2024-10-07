// components/CheckboxInput.js
import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const CheckboxInput = ({ control, name, label }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={<Checkbox {...field} />}
        label={label}
        className="mb-4"
      />
    )}
  />
);

export default CheckboxInput;
