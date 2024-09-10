import React, { useState } from "react";
import { TextField, FormControl, InputLabel, Button } from "@mui/material";
import RenderSchema from "./RenderSchema";
import CommonLabel from "../common/label";
import SelectSchema from "./SelectSchema";
import SettingListItem from "./SettingsListItem";

const EditingForm = ({
  editingSchema,
  handleValueChange,
  showRouteInput,
  disableBlockAdd,
}) => {
  const [editingBlock, setEditingBlock] = useState(null);

  const handleItemChange = (schema) => {
    setEditingBlock((prevSchema) => ({
      ...prevSchema,
      blocks: schema,
    }));
  };

  const handleBlockSave = () => {
    const newBlock = {
      ...(editingBlock.blocks || {}),
    };
    handleValueChange("blocks", [...(editingSchema.blocks || []), newBlock]);
    setEditingBlock(null);
  };

  return (
    <div>
      <FormControl fullWidth required>
        <RenderSchema
          levelJson={editingSchema}
          path={[]}
          schemaEditMode={false}
          onChangeSettings={(newSettings) =>
            handleValueChange("settings", newSettings)
          }
        />
      </FormControl>

      {!disableBlockAdd && (
        <FormControl fullWidth className="mt-4">
          <CommonLabel className="mb-2">Blocks</CommonLabel>
          <div className="mb-4">
            {editingSchema.blocks?.map((item, index) => (
              <SettingListItem
                key={item.slug}
                item={item}
                onDelete={() => {
                  let filteredBlocks = editingSchema.blocks.filter((ele, i) => {
                    return i !== index;
                  });
                  console.log(filteredBlocks);
                  handleValueChange("blocks", filteredBlocks);
                }}
              />
            ))}
          </div>

          {editingBlock && (
            <div className="mb-4">
              <FormControl fullWidth required className="mb-2">
                <SelectSchema
                  apiParams={{ type: "block" }}
                  label="Block Type"
                  onItemChange={handleItemChange}
                />
              </FormControl>
              <div className="flex flex-row gap-2">
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setEditingBlock(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={editingBlock.type}
                  onClick={() => {
                    handleBlockSave();
                  }}
                >
                  Save Block
                </Button>
              </div>
            </div>
          )}

          {!editingBlock && (
            <div
              className="cursor-pointer border border-gray-300 w-full text-center py-2"
              onClick={() => {
                setEditingBlock({
                  slug: "",
                  defaultCount: 1,
                });
              }}
            >
              + Add Block
            </div>
          )}
        </FormControl>
      )}
    </div>
  );
};

export default EditingForm;
