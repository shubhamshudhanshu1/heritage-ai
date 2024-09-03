import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import CommonLabel from "../common/label";
import { renderComponents } from "@/helper/utils";

let schemas = [
  {
    type: "select",
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

function PageSettings() {
  const [page, setPage] = useState("");

  return (
    <div>
      <FormControl
        fullWidth
        margin="normal"
        required
        sx={{ margin: 0 }}
        className="py-2 pb-4"
      >
        <CommonLabel>Page</CommonLabel>
        <Select
          labelId="tenant-select-label"
          name="User Type"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="tenant1"> Home</MenuItem>
          <MenuItem value="tenant2">Cart</MenuItem>
          <MenuItem value="tenant3">Review</MenuItem>
        </Select>
      </FormControl>
      <div className="pt-4">
        {schemas.map((schema) => {
          return <div className="py-2">{renderComponents(schema)} </div>;
        })}
      </div>
    </div>
  );
}

export default PageSettings;
