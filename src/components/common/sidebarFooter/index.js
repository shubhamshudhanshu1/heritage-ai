import React from "react";
import { Button } from "@mui/material";

const SidebarFooter = ({ text, onSave, isFormValid }) => {
  if (!text) {
    return null;
  }
  return (
    <div className="sticky bottom-0 z-50 bg-white p-4 shadow-sm">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isFormValid}
        onClick={onSave}
      >
        {text}
      </Button>
    </div>
  );
};

export default SidebarFooter;
