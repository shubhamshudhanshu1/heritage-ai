import React, { useState } from "react";
import LevelSettings from "./levelSettings";
import Tabs from "../common/tab";
import { FormControl, MenuItem, Select } from "@mui/material";
import CommonLabel from "../common/label";

const levelConfig = {
  global: {
    label: "Global Settings",
    childKey: "pages",
    tabView: true,
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
  const [selectedChildIndex, setSelectedChildIndex] = useState(0); // Track selected index
  const currentLevelConfig = levelConfig[level] || {};
  const childKey = currentLevelConfig.childKey;
  const childLevelConfig = levelConfig[childKey] || {};
  const childItems = object[childKey] || [];

  const handleTabChange = (newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const newSelectedIndex = childLevelConfig.options.findIndex(
      (option) => option.id === selectedId
    );
    setSelectedChildIndex(newSelectedIndex); // Update selected index
  };

  console.log({ selectedChildIndex }, childLevelConfig.options);
  return (
    <div>
      {currentLevelConfig.tabView ? (
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
                      labelId="child-select-label"
                      name="Child Type"
                      value={
                        childLevelConfig.options?.[selectedChildIndex]?.id || ""
                      }
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {childLevelConfig.options?.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {childItems[selectedChildIndex] && (
                    <Renderer
                      key={`${level}-${selectedChildIndex}`}
                      object={childItems[selectedChildIndex]}
                      level={childKey}
                      path={[...path, childKey, selectedChildIndex]}
                    />
                  )}
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
      ) : (
        <div>
          <LevelSettings levelJson={object} path={path} />
          {childItems.map((childItem, index) => (
            <Renderer
              key={`${level}-${index}`} // Add a key for React reconciliation
              object={childItem}
              level={childKey}
              path={[...path, childKey, index]} // Extend the path for the child
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Renderer;
