import React from "react";
import { Typography, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CommonLabel = ({
  text,
  variant = "p",
  color = "textPrimary",
  children,
  info = "",
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      color={color}
      display="flex"
      alignItems="center"
      {...props}
    >
      {text || children}
      {info && (
        <Tooltip title={info} arrow>
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Typography>
  );
};

export default CommonLabel;
