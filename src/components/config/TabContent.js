import React from "react";
import { Button } from "@mui/material";
import RenderSchema from "./RenderSchema";
import SettingListItem from "./SettingsListItem";

const TabContent = ({
  settings = [],
  activeTab,
  onEdit,
  onDelete,
  onAddNew,
  isGlobal,
  editingSchema,
  handleValueChange,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {!settings.length && !isGlobal ? (
        <div>No {activeTab} settings found.</div>
      ) : null}
      {isGlobal ? (
        <RenderSchema
          levelJson={{ ...settings[0], ...editingSchema } || {}}
          path={[]}
          schemaEditMode={false}
          onChangeSettings={(newSettings) =>
            handleValueChange("settings", newSettings)
          }
        />
      ) : (
        <>
          {settings.map((item) => (
            <SettingListItem
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onAddNew}
            sx={{ mt: 2 }}
          >
            Add {activeTab}
          </Button>
        </>
      )}
    </div>
  );
};

export default TabContent;
