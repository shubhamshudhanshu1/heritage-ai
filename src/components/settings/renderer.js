import React, { useState } from "react";
import LevelSettings from "./levelSettings";
import CommonLabel from "../common/label";
import Tabs from "../common/tab";

const levelConfig = {
  global: {
    label: "Global Settings",
    childKey: "pages",
  },
  pages: {
    label: "Page Settings",
    childKey: "sections",
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
  const [activeTab, setActiveTab] = useState("parent");

  const currentLevelConfig = levelConfig[level] || {};
  const childKey = currentLevelConfig.childKey;
  const childLevelConfig = levelConfig[childKey] || {};

  const childItems = object[childKey] || [];

  const handleTabChange = (newTabIndex) => {
    setActiveTab(newTabIndex);
  };

  console.log({ activeTab });
  return (
    <div>
      <CommonLabel>{}</CommonLabel>
      <Tabs
        tabs={[
          {
            label: currentLevelConfig.label,
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
                {childItems.map((childItem, index) => (
                  <Renderer
                    key={`${level}-${index}`} // Add a key for React reconciliation
                    object={childItem}
                    level={childKey}
                    path={[...path, childKey, index]} // Extend the path for the child
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
