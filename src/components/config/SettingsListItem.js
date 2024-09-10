import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const SettingListItem = ({ item, onEdit, onDelete }) => {
  return (
    <div
      className="flex flex-row gap-0 bg-white items-center w-full p-4 rounded-md cursor-pointer"
      onClick={(e) => {
        onEdit(item);
      }}
    >
      <DragIndicatorIcon />
      <div className="w-full">{item.name}</div>
      <div className="flex flex-row gap-2">
        {onEdit && <EditNoteOutlinedIcon />}
        <CloseOutlinedIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item._id);
          }}
        />
      </div>
    </div>
  );
};

export default SettingListItem;
