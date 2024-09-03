import React from "react";
import { Typography } from "@mui/material";

const CommonLabel = ({
  text,
  variant = "p",
  color = "textPrimary",
  children,
  ...props
}) => {
  return (
    <Typography variant={variant} color={color} {...props}>
      {text || children}
    </Typography>
  );
};

export default CommonLabel;
