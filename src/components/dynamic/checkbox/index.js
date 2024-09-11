import PropTypes from "prop-types";
import { Checkbox as MuiCheckbox } from "@mui/material";
import CommonLabel from "@/components/common/label";

const Checkbox = ({ label, value, onChange, ...props }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <MuiCheckbox
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        {...props}
        checked={value}
        sx={{ padding: 0 }}
      />
      <CommonLabel info={props.info || ""}>{label}</CommonLabel>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  label: "",
  checked: false,
};

export default Checkbox;
