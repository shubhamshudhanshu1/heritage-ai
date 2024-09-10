import React from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Typography } from "@mui/material";

const SidebarHeader = ({ isEditing, activeTab, onBackClick, title = "" }) => {
  return (
    <div className="sticky top-0 z-50 bg-white p-4 shadow-sm">
      {isEditing ? (
        <div
          className="flex flex-row gap-3 items-center cursor-pointer"
          onClick={onBackClick}
        >
          <ArrowBackIosNewOutlinedIcon />
          <Typography className="font-bold text-sm" variant="h6">
            Editing {activeTab}
          </Typography>
        </div>
      ) : (
        <Typography className="font-bold text-sm" variant="h6">
          {title || "Setting Schema"}
        </Typography>
      )}
    </div>
  );
};

export default SidebarHeader;
