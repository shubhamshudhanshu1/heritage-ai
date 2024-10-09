import React, { useEffect, useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SelectSchema from "./SelectSchema";
import Draggable from "./../common/draggable";
import { Typography } from "@mui/material";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function ChildList({ label, dataArr, type, onChildArrayChange }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(dataArr);
  }, [dataArr]);

  const onDelete = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
    onChildArrayChange(updatedList); // Notify parent about the change
  };

  function dragEnded(result) {
    if (!result.destination) return;
    const reorderedList = reorder(
      list,
      result.source.index,
      result.destination.index
    );
    setList(reorderedList);
    onChildArrayChange(reorderedList); // Notify parent about the reordering
  }

  return (
    <div>
      <div className="my-4">
        <Typography className="font-bold text-sm mb-2" variant="h6">
          {label}
        </Typography>
        <Draggable
          array={list}
          renderItem={(item, index) => (
            <div className="flex flex-row gap-0 bg-primary-50 items-center w-full p-4 rounded-md">
              <DragIndicatorIcon />
              <div className="w-full">{item.name}</div>
              <div className="flex flex-row gap-2">
                <CloseOutlinedIcon onClick={() => onDelete(index)} />
              </div>
            </div>
          )}
          onDragEnd={dragEnded}
        />
      </div>

      <div className="mb-2">
        <SelectSchema
          apiParams={{ type }}
          label={`Select ${type}`}
          onItemChange={(item) => {
            setList((s) => {
              const updatedList = [...s, item];
              onChildArrayChange(updatedList); // Notify parent about the new item
              return updatedList;
            });
          }}
        />
      </div>
    </div>
  );
}

export default ChildList;
