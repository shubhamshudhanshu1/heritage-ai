// components/NumberInput.js
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import CommonLabel from "@/components/common/label";

const NumberInput = ({ label, value, onChange, min, max, step, ...props }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    // Ensure the value is a valid number and within the specified range
    const numericValue = Number(value);
    if (
      !isNaN(numericValue) &&
      (min === undefined || numericValue >= min) &&
      (max === undefined || numericValue <= max)
    ) {
      onChange(event, numericValue);
    }
  };

  return (
    <div>
      <CommonLabel info={props.info || ""}>{label}</CommonLabel>
      <TextField
        type="number"
        value={value}
        onChange={handleChange}
        InputProps={{
          inputProps: {
            min: min,
            max: max,
            step: step,
          },
        }}
        fullWidth
        {...props}
      />
    </div>
  );
};

NumberInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

NumberInput.defaultProps = {
  label: "",
  min: undefined,
  max: undefined,
  step: 1,
  onChange: () => {},
};

export default NumberInput;
