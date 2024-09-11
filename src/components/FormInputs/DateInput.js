// components/DateInput.js
import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const DateInput = ({ control, name, label, errors }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        type="date"
        variant="outlined"
        error={!!errors[name]}
        helperText={errors[name]?.message}
        className="w-full mb-4"
      />
    )}
  />
);

export default DateInput;
