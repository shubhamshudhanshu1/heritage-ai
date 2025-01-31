import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import CommonLabel from "../../common/label";

const Input = ({ variant, label, type, value, onChange, ...props }) => {
  return (
    <div>
      <CommonLabel info={props.info || ""}>{label}</CommonLabel>
      <TextField
        fullWidth
        variant={variant}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
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
