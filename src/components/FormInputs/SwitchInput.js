// components/SwitchInput.js
import React from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const SwitchInput = ({ control, name, label }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={<Switch {...field} />}
        label={label}
        className="mb-4"
      />
    )}
  />
);

export default SwitchInput;
