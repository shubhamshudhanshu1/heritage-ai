// components/Input.js
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import CommonLabel from "../../common/label";

const Input = ({ variant, label, type, value, onChange, ...props }) => {
  return (
    <>
      <CommonLabel>{label}</CommonLabel>
      <TextField
        fullWidth
        variant={variant}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

Input.propTypes = {
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  variant: "outlined",
  label: "",
  type: "text",
  value: "",
};

export default Input;
