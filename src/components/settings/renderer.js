import React, { useState } from "react";
import LevelSettings from "./levelSettings";
import Tabs from "../common/tab";
import { FormControl, MenuItem, Select } from "@mui/material";
import CommonLabel from "../common/label";

const levelConfig = {
  global: {
    label: "Global Settings",
    childKey: "pages",
  },
  pages: {
    label: "Page Settings",
    childKey: "sections",
    options: [
      { label: "Home", id: "home" },
      { label: "Cart Landing", id: "cart-landing" },
      { label: "Cart Review", id: "cart-review" },
    ],
  },
  sections: {
    label: "Section Settings",
    childKey: "blocks",
  },
  blocks: {
    label: "Block Settings",
    childKey: null,
  },
};

function Renderer({ object, level, path = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const currentLevelConfig = levelConfig[level] || {};
  const childKey = currentLevelConfig.childKey;
  const childLevelConfig = levelConfig[childKey] || {};
  const childItems = object[childKey] || [];
  const handleTabChange = (newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  return (
    <div>
      <Tabs
        tabs={[
          {
            label: "Settings",
            content: (
              <div>
                <LevelSettings levelJson={object} path={path} />
              </div>
            ),
            id: 0,
          },
          {
            label: childLevelConfig.label,
            content: (
              <div>
                <FormControl
                  fullWidth
                  margin="normal"
                  required
                  className="px-4"
                >
                  <CommonLabel>Select {childKey}</CommonLabel>
                  <Select
                    labelId="tenant-select-label"
                    name="User Type"
                    value={"home"}
                    onChange={(e) => {}}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {childLevelConfig.options?.map((option) => {
                      return (
                        <MenuItem value={option.id}> {option.label}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {childItems.map((childItem, index) => (
                  <Renderer
                    key={`${level}-${index}`}
                    object={childItem}
                    level={childKey}
                    path={[...path, childKey, index]}
                  />
                ))}
              </div>
            ),
            id: 1,
          },
        ]}
        value={activeTab}
        onChange={(newValue) => {
          handleTabChange(newValue);
        }}
      />
    </div>
  );
}

export default Renderer;
