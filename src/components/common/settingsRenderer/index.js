import { renderComponents } from "@/helper/utils";
import { onChangeProp } from "@/redux/slices/configSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

function SettingsRenderer({ settings, props = {} }) {
  const { schemaEditMode } = useSelector((state) => state.config);
  const dispatch = useDispatch();
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
        return (
          <div
            key={setting.id}
            className="flex flex-row gap-2 items-center w-full bg-slate-50 p-4 rounded-sm"
          >
            <DragIndicatorIcon />
            <div className="w-full">{setting.label}</div>
            <EditNoteOutlinedIcon />
          </div>
        );
      })}
    </div>
  );
}

export default SettingsRenderer;
