import PropTypes from "prop-types";
import { Slider, Box } from "@mui/material";
import CommonLabel from "@/components/common/label";

const valuetext = (value) => `${value}`;

const RangeInput = ({ label, value, onChange, min, max, step, ...props }) => {
  return (
    <Box {...props} sx={{ width: "100%" }}>
      <CommonLabel info={props.info || ""}>{label}</CommonLabel>
      <div className="p-2 pt-10">
        <Slider
          value={value}
          onChange={(event, newValue) => onChange(event, newValue)}
          aria-label="Range input"
          getAriaValueText={valuetext}
          step={step}
          min={min}
          max={max}
          valueLabelDisplay="on"
          marks={[
            {
              value: min,
              label: min,
            },
            {
              value: max,
              label: max,
            },
          ]}
        />
      </div>
    </Box>
  );
};

RangeInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

RangeInput.defaultProps = {
  label: "",
  min: 0,
  max: 10000000,
  step: 1,
  onChange: () => {},
};

export default RangeInput;
