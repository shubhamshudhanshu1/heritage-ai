import React from "react";
import { TextField, FormControl, FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import merge from "lodash.merge"; // Import lodash.merge to deep merge objects

const TextInput = ({
  control,
  name,
  label = "",
  type = "text",
  size = "small",
  variant = "outlined",
  fullWidth = true,
  margin = "none",
  helperText = "",
  defaultValue = "",
  placeholder = "",
  labelPosition = "above", // Prop to control label position
  rules = {}, // Validation rules derived from schema
  inputProps = {}, // Allow external inputProps overrides
  inputLabelProps = {}, // Allow external inputLabelProps overrides
  ...rest
}) => {
  // Determine if the field is required based on rules
  const isRequired = !!rules?.required;

  console.log({ name: rules });
  // Default InputProps for the TextField
  const defaultInputProps = {
    sx: {
      fontSize: "14px", // Default input font size
    },
  };

  // Default InputLabelProps for the TextField
  const defaultInputLabelProps = {
    sx: {
      fontSize: "14px", // Default label font size
    },
  };

  // Merge default and external props
  const mergedInputProps = merge(defaultInputProps, inputProps);
  const mergedInputLabelProps = merge(defaultInputLabelProps, inputLabelProps);

  return (
    <FormControl fullWidth={fullWidth} margin={margin} size={size}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules} // Pass rules for validation
        render={({ field, fieldState: { error } }) => (
          <>
            {" "}
            {labelPosition === "above" && (
              <FormLabel error={!!error} sx={{ mb: 1, fontSize: "14px" }}>
                {label}
                {isRequired && <span style={{ color: "inherit" }}> *</span>}
              </FormLabel>
            )}
            <TextField
              {...field}
              label={
                labelPosition === "inside"
                  ? `${label}${isRequired ? " *" : ""}` // Show asterisk inside if required
                  : ""
              }
              variant={variant}
              size={size}
              error={!!error}
              placeholder={placeholder} // Placeholder inside input
              helperText={error ? error.message : helperText} // Display error message from Zod
              slotProps={{
                input: {
                  sx: {
                    fontSize: "14px",
                    minHeight: "40px",
                  },
                  ...(type === "number",
                  {
                    min: 0,
                  }),
                  ...inputProps,
                },
                label: {
                  sx: {
                    fontSize: "14px",
                  },
                },
              }}
              {...rest}
            />
          </>
        )}
      />
    </FormControl>
  );
};

export default TextInput;
