import { renderComponents } from "@/helper/utils";
import { onChangeProp } from "@/redux/slices/configSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// Function to reorder settings after drag-and-drop
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function SettingsRenderer({
  settings,
  props = {},
  onEdit = () => {},
  onDelete = () => {},
  onChangeSettings = () => {},
}) {
  const { schemaEditMode } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  // Handler for drag end event
  function dragEnded(result) {
    if (!result.destination) return;
    const reorderedSettings = reorder(
      settings,
      result.source.index,
      result.destination.index
    );
    onChangeSettings(reorderedSettings); // Updates the settings order after drag-and-drop
  }

  if (schemaEditMode) {
    return (
      <DragDropContext onDragEnd={dragEnded}>
        <Droppable droppableId="settingsList">
          {(provided) => (
            <div
              className="flex flex-col gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {settings.map((setting, index) => (
                <Draggable
                  key={setting.id}
                  draggableId={setting.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-row gap-2 items-center w-full bg-slate-50 p-4 rounded-sm"
                    >
                      <DragIndicatorIcon />
                      <div className="w-full">{setting.label}</div>
                      <div className="flex flex-row gap-2">
                        <EditNoteOutlinedIcon
                          onClick={() => {
                            onEdit(index);
                          }}
                        />
                        <CloseOutlinedIcon
                          onClick={() => {
                            onDelete(index);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  // Normal render when not in schemaEditMode
  return (
    <div className="flex flex-col gap-4">
      {settings.map((setting) => {
        if (!schemaEditMode) {
          return (
            <div className="w-full" key={setting.id}>
              {renderComponents(setting, {
                value: props[setting.id],
                onChange: (val) => {
                  dispatch(onChangeProp({ id: setting.id, value: val }));
                },
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

export default SettingsRenderer;
