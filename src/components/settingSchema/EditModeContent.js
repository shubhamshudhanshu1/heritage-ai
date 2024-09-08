import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button, TextField } from "@mui/material";
import { Box, Typography } from "@mui/material";
import RenderSchema from "./renderSchema";
import { useDispatch, useSelector } from "react-redux";
import { updateConfig } from "@/redux/slices/configSlice";

const EditModeContent = ({ activeTab, setEditingSchema, ...props }) => {
  const dispatch = useDispatch();
  const { data: settings } = useSelector((state) => state.settingSchema);
  const [newItem, setNewItem] = useState("");

  const handleAddNewItem = () => {
    setEditingSchema({ name: "", type: activeTab, slug: "", settings: [] });
  };

  const handleDeleteItem = (index) => {};

  const renderAddNewItemForm = () => (
    <div className="mt-4">
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleAddNewItem}
      >
        Add {activeTab === "page" ? "Page" : "Section"}
      </Button>
    </div>
  );

  return (
    <Box>
      {settings.length ? (
        settings.map((setting, index) => (
          <div
            key={`${activeTab}-${index}`}
            className="flex flex-row gap-2 items-center justify-between w-full bg-primary-50 p-4 rounded-sm"
          >
            <div className="flex flex-row gap-2 items-center">
              <DragIndicatorIcon />
              <div>{setting.label || `Item ${index + 1}`}</div>
            </div>
            <CloseOutlinedIcon
              onClick={() => handleDeleteItem(index)}
              className="cursor-pointer"
            />
          </div>
        ))
      ) : (
        <div>No {activeTab === "page" ? "Pages" : "Sections"} found.</div>
      )}
      {renderAddNewItemForm()}
    </Box>
  );
};

export default EditModeContent;
