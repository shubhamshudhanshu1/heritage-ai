import React from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CommonLabel from "@/components/common/label";

const CommonAutocompleteWithChips = ({
  options = [],
  label = "Select",
  defaultValue = [],
  placeholder = "Favorites",
  freeSolo = false,
  filterSelectedOptions = false,
  readOnly = false,
  variant = "outlined",
  onChange = () => {},
  ...props
}) => {
  return (
    <div>
      <CommonLabel info={props.info || ""}>{label}</CommonLabel>
      <Autocomplete
        multiple
        options={options}
        defaultValue={defaultValue}
        getOptionLabel={(option) => option.title || option}
        filterSelectedOptions={filterSelectedOptions}
        freeSolo={freeSolo}
        readOnly={readOnly}
        onChange={(event, value) => onChange(value)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                variant="outlined"
                label={option.title || option}
                key={key}
                {...tagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField {...params} variant={variant} {...props} />
        )}
      />
    </div>
  );
};

CommonAutocompleteWithChips.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
  placeholder: PropTypes.string,
  freeSolo: PropTypes.bool,
  filterSelectedOptions: PropTypes.bool,
  readOnly: PropTypes.bool,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  onChange: PropTypes.func,
};

export default CommonAutocompleteWithChips;
