import React from "react";
import PropTypes from "prop-types";
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import merge from "lodash.merge"; // Import lodash.merge to deep merge objects
import CommonLabel from "../common/label";

const SelectInput = ({
  control,
  name,
  label,
  options,
  variant = "outlined",
  rules = {},
  fullWidth = true,
  margin = "none",
  size = "small",
  labelPosition = "above", // Prop to control label position
  inputSlotProps = {}, // Allow external slotProps overrides for input
  labelSlotProps = {}, // Allow external slotProps overrides for label
  ...props
}) => {
  // Determine if the field is required based on rules
  const isRequired = !!rules?.required;

  // Default slotProps for the input element
  const defaultInputSlotProps = {
    sx: {
      fontSize: "14px", // Default input font size
    },
  };

  // Default slotProps for the label element
  const defaultLabelSlotProps = {
    sx: {
      fontSize: "14px", // Default label font size
    },
  };

  // Merge default and external props
  const mergedInputSlotProps = merge(defaultInputSlotProps, inputSlotProps);
  const mergedLabelSlotProps = merge(defaultLabelSlotProps, labelSlotProps);

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      margin={margin}
      size={size}
      {...props}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            {labelPosition === "above" && (
              <FormLabel error={!!error} sx={{ mb: 1, fontSize: "14px" }}>
                {label}
                {isRequired && <span style={{ color: "red" }}> *</span>}
              </FormLabel>
            )}
            <MuiSelect
              {...field}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!error} // Display error state
              slotProps={{
                input: mergedInputSlotProps,
                label: mergedLabelSlotProps,
              }}
              displayEmpty>
              <MenuItem value="">Select {label}</MenuItem>
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiSelect>
            {/* Display error message */}
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </FormControl>
  );
};

SelectInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  rules: PropTypes.object,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(["none", "dense", "normal"]),
  size: PropTypes.oneOf(["small", "medium"]),
  labelPosition: PropTypes.oneOf(["above", "inside"]),
  inputSlotProps: PropTypes.object,
  labelSlotProps: PropTypes.object,
};

export default SelectInput;
