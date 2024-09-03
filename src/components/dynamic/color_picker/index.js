"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { ChromePicker } from "react-color";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import CommonLabel from "../../common/label";

const ColorPicker = ({ label, value, onChange, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState(value);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    // onChange(newColor.hex);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-picker-popover" : undefined;

  return (
    <Box className="flex items-center justify-between" {...props}>
      <CommonLabel>{label}</CommonLabel>
      <div
        className="relative cursor-pointer border border-gray-300 p-1 rounded"
        onClick={handleClick}
      >
        <div
          className="w-12 h-6 rounded"
          style={{ backgroundColor: color }}
        ></div>
        <div className="absolute inset-0 border border-white pointer-events-none"></div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ChromePicker color={color} onChange={handleColorChange} />
      </Popover>
    </Box>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  label: "Pick a color",
};

export default ColorPicker;
