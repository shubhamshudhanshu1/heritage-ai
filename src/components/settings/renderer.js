import React, { useState } from "react";
import LevelSettings from "./levelSettings";
import Tabs from "../common/tab";
import {
  FormControl,
  MenuItem,
  Select,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CommonLabel from "../common/label";
import EditIcon from "@mui/icons-material/Edit"; // Import the edit icon
import Draggable from "../common/draggable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [editedChild, setEditedChild] = useState({});
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
    setSelectedChildIndex(newSelectedIndex);
  };

  const handleEditClick = (index) => {
    setEditedChild(childItems[index]);
  };

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
                    className="py-2"
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
          onChange={(newValue) => handleTabChange(newValue)}
        />
      ) : (
        <div>
          <LevelSettings levelJson={object} path={path} />
          {editedChild.name ? (
            <div className="mt-4">
              <div
                className=" bg-slate-50  p-4 flex flex-row gap-3 items-center cursor-pointer mb-4"
                onClick={() => {
                  setEditedChild({});
                }}
              >
                <ArrowBackIosNewOutlinedIcon />
                {editedChild.label}
              </div>
              {editedChild && (
                <Renderer
                  object={editedChild}
                  level={childKey}
                  path={[...path, childKey, selectedChildIndex]}
                />
              )}
            </div>
          ) : (
            <div className="mt-4">
              <Typography
                className="font-bold mb-2"
                variant="p"
                noWrap
                component="div"
              >
                {childLevelConfig.label}
              </Typography>
              <Draggable
                array={childItems}
                renderItem={(childItem, index) => (
                  <div
                    key={`${level}-${index}`}
                    onClick={() => handleEditClick(index)}
                    className="flex flex-row gap-2 items-center justify-between w-full bg-slate-50 p-4 rounded-sm"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <DragIndicatorIcon />
                      <div>{childItem.label || `Child ${index + 1}`}</div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <CloseOutlinedIcon onClick={() => {}} />
                    </div>
                  </div>
                )}
                onDragEnd={(newArray) => {
                  console.log(newArray);
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {}}
              >
                Add {childLevelConfig.label}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Renderer;
