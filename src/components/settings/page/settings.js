import { renderComponents } from "@/helper/utils";
import { Button } from "@mui/material";
import React, { useState } from "react";
import AddSchemaModal from "./addSchemaModal";

let schemas = [
  {
    type: "list",
    default: "default value",
    id: "myName",
    info: "",
    label: "Name",
    options: [],
  },
  {
    type: "text",
    default: "default text",
    id: "myHouse",
    info: "",
    label: "House",
  },
  {
    type: "color_picker",
    default: "#0000",
    id: "myColor",
    info: "",
    label: "Color",
  },
  {
    type: "checkbox",
    default: "#0000",
    id: "myColor",
    info: "",
    label: "Color",
  },
  {
    type: "number",
    default: "0",
    id: "myRange",
    info: "",
    label: "Range",
  },
  {
    type: "image_picker",
    default: "0",
    id: "myImage",
    info: "",
    label: "Image Picker",
  },
  {
    type: "image_picker",
    default: "0",
    id: "myImage",
    info: "",
    label: "Image Picker",
  },
];

function Settings() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddSchema = (newSchema) => {};

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {schemas.map((schema) => {
          return renderComponents(schema);
        })}
      </div>

      <AddSchemaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddSchema={handleAddSchema}
      />

      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => setModalOpen(true)}
      >
        Add Settings
      </Button>
    </div>
  );
}

export default Settings;
