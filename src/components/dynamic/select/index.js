// components/Select.js
import PropTypes from "prop-types";
import { Select as MuiSelect, MenuItem, FormControl } from "@mui/material";
import CommonLabel from "../../common/label";

const Select = ({ label, value, onChange, options, variant, ...props }) => {
  return (
    <FormControl variant={variant} {...props} fullWidth>
      <CommonLabel info={props.info || ""}>{label}</CommonLabel>
      <MuiSelect value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
};

Select.defaultProps = {
  variant: "outlined",
};

export default Select;
