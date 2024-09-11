import React, { useState } from "react";
import LevelSettings from "./levelSettings";
import Tabs from "../common/tab";
import { FormControl, Button, Typography } from "@mui/material";
import Draggable from "../common/draggable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useDispatch } from "react-redux";
import { addChild, deleteChild } from "@/redux/slices/configSlice";
import SelectSchema from "../settingSchema/SelectSchema";

const levelConfig = {
  global: {
    label: "Global Settings",
    childKey: "pages",
    tabView: true,
  },
  pages: {
    label: "Page Settings",
    childKey: "sections",
    bgColor: "bg-slate-50",
    options: [
      { label: "Home", id: "home" },
      { label: "Cart Landing", id: "cart-landing" },
      { label: "Cart Review", id: "cart-review" },
    ],
  },
  sections: {
    label: "Section Settings",
    childKey: "blocks",
    bgColor: "bg-slate-50",
  },
  blocks: {
    label: "Block Settings",
    bgColor: "bg-slate-100",
    childKey: null,
  },
};

function Renderer({ rendererObject = {}, level, path = [], schemaEditMode }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChildIndex, setSelectedChildIndex] = useState(null);
  const [newChild, setNewChild] = useState({ label: "", name: "" });
  const [addingChild, setAddingChild] = useState(null);
  const dispatch = useDispatch();
  const currentLevelConfig = levelConfig[level] || {};
  const childKey = currentLevelConfig.childKey;
  const childLevelConfig = levelConfig[childKey] || {};
  const childItems = rendererObject[childKey] || [];

  const editedChild = childItems[selectedChildIndex] || {};

  console.log({
    rendererObject,
    level,
    path,
    currentLevelConfig,
    childLevelConfig,
    childKey,
    childItems,
    editedChild,
    selectedChildIndex,
  });

  const handleTabChange = (newTabIndex) => setActiveTab(newTabIndex);

  const handleEditClick = (index) => {
    const selectedIndex = index;
    setSelectedChildIndex(selectedIndex);
  };

  const handleAddChild = () => {
    dispatch(addChild({ path: [...path], childKey, newChild }));
    setNewChild({ label: "", name: "" });
    setAddingChild(null);
  };

  const handleDeleteChild = (index) => {
    dispatch(deleteChild({ path: [...path, childKey, index] }));
  };

  const renderCurrentLevelSettings = () => (
    <div className="mt-3">
      <LevelSettings levelJson={rendererObject} path={path} />
    </div>
  );

  const addNewChild = () => {
    if (!childKey) {
      return null;
    }
    return (
      <div className="mt-4">
        {addingChild && (
          <div className="mb-4">
            <FormControl fullWidth required className="mb-2">
              <SelectSchema
                apiParams={{ type: childKey.slice(0, -1) }}
                label={`Select ${childKey}`}
                onItemChange={(item) => {
                  setNewChild(item);
                }}
              />
            </FormControl>
            <div className="flex flex-row gap-2">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  setAddingChild(null);
                  setNewChild(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={addingChild.type}
                onClick={() => {
                  handleAddChild();
                }}
              >
                Add {childKey}
              </Button>
            </div>
          </div>
        )}
        {!addingChild && (
          <div
            className="cursor-pointer border border-gray-300 w-full text-center py-2"
            onClick={() => {
              setAddingChild({
                slug: "",
                defaultCount: 1,
              });
            }}
          >
            + Add {childKey}
          </div>
        )}
      </div>
    );
  };
  const renderChildList = () => {
    return (
      <div className="">
        <>
          {childItems.length ? (
            <Draggable
              array={childItems}
              renderItem={(childItem, index) => {
                if (!childItems) {
                  return null;
                }
                return (
                  <div
                    key={`${level}-${index}-${childItem.slug}`}
                    onClick={() => handleEditClick(index)}
                    className="flex flex-row gap-2 items-center justify-between w-full bg-primary-50 p-4 rounded-sm"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <DragIndicatorIcon />
                      <div>
                        {childItem.label ||
                          childItem.name ||
                          `Child ${index + 1}`}
                      </div>
                    </div>
                    <CloseOutlinedIcon
                      onClick={() => handleDeleteChild(index)}
                      className="cursor-pointer"
                    />
                  </div>
                );
              }}
              onDragEnd={(newArray) => {}}
            />
          ) : childKey ? (
            <div>No {childKey}</div>
          ) : null}
        </>
        {addNewChild()}
      </div>
    );
  };

  const renderChildrens = () => {
    return (
      <div className={`my-2 rounded-lg`}>
        {editedChild.name ? (
          <div>
            <div
              className="pb-4 flex flex-row gap-3 items-center cursor-pointer text-primary"
              onClick={() => setSelectedChildIndex(null)}
            >
              <ArrowBackIosNewOutlinedIcon />
              <span className="border-b-2 border-primary">
                Editing {editedChild.label || childKey}
              </span>
            </div>
            {editedChild && (
              <Renderer
                rendererObject={editedChild}
                level={childKey}
                path={[...path, childKey, selectedChildIndex]}
                schemaEditMode={schemaEditMode}
              />
            )}
          </div>
        ) : (
          renderChildList()
        )}
      </div>
    );
  };

  if (currentLevelConfig.tabView) {
    return (
      <Tabs
        tabs={[
          {
            label: "Settings",
            content: renderCurrentLevelSettings(),
            id: 0,
          },
          {
            label: childLevelConfig.label,
            content: renderChildrens(),
            id: 1,
          },
        ]}
        value={activeTab}
        onChange={handleTabChange}
      />
    );
  }
  return (
    <div>
      {renderCurrentLevelSettings()}
      <Typography className="font-bold mt-4 my-2" variant="p" component="div">
        {childLevelConfig.label}
      </Typography>
      {renderChildrens()}
    </div>
  );
}

export default Renderer;
