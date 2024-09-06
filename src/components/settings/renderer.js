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
import EditIcon from "@mui/icons-material/Edit";
import Draggable from "../common/draggable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useSelector } from "react-redux";
import { addChild, deleteChild, updateChild } from "@/redux/slices/configSlice";
import { useDispatch } from "react-redux";

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
    bgColor: "bg-slate-50",
  },
  blocks: {
    label: "Block Settings",
    bgColor: "bg-slate-100",
    childKey: null,
  },
};

function Renderer({ object, level, path = [], schemaEditMode }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [editedChild, setEditedChild] = useState({});
  const [newChild, setNewChild] = useState({ label: "", name: "" });

  const currentLevelConfig = levelConfig[level] || {};
  const childKey = currentLevelConfig.childKey;
  const childLevelConfig = levelConfig[childKey] || {};
  const childItems = object[childKey] || [];

  const dispatch = useDispatch();
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

  const handleAddChild = () => {
    dispatch(addChild({ path: [...path], childKey: childKey, newChild }));
    setNewChild({ label: "", name: "" });
  };

  const handleUpdateChild = (index) => {
    dispatch(updateChild({ path: [...path, childKey], index, newChild }));
    setNewChild({ label: "", name: "" });
  };

  const handleDeleteChild = (index) => {
    dispatch(deleteChild({ path: [...path, childKey], index, newChild }));
    setNewChild({ label: "", name: "" });
  };

  console.log({ childItems, level });

  return (
    <div>
      {currentLevelConfig.tabView ? (
        <Tabs
          tabs={[
            {
              label: "Settings",
              content: (
                <div className="mt-3">
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
                      schemaEditMode={schemaEditMode}
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
          <Typography
            className="font-bold mt-4 my-2"
            variant="p"
            noWrap
            component="div"
          >
            {childLevelConfig.label}
          </Typography>
          <div className={`${childLevelConfig.bgColor} p-2 py-4 rounded-lg`}>
            {editedChild.name ? (
              <div>
                <div
                  className="pb-4 flex flex-row gap-3 items-center cursor-pointer text-primary"
                  onClick={() => {
                    setEditedChild({});
                  }}
                >
                  <ArrowBackIosNewOutlinedIcon />
                  <span className="border-b-2 border-primary">
                    Editing {editedChild.label || childKey}
                  </span>
                </div>
                {editedChild && (
                  <Renderer
                    object={editedChild}
                    level={childKey}
                    path={[...path, childKey, selectedChildIndex]}
                    schemaEditMode={schemaEditMode}
                  />
                )}
              </div>
            ) : (
              <div>
                <Draggable
                  array={childItems}
                  renderItem={(childItem, index) => (
                    <div
                      key={`${level}-${index}`}
                      onClick={() => handleEditClick(index)}
                      className="flex flex-row gap-2 items-center justify-between w-full bg-primary-50 p-4 rounded-sm"
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <DragIndicatorIcon />
                        <div>{childItem.label || `Child ${index + 1}`}</div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <CloseOutlinedIcon
                          onClick={() => {
                            handleDeleteChild(index);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  onDragEnd={(newArray) => {
                    console.log(newArray);
                  }}
                />
                {schemaEditMode && (
                  <div className="mt-4">
                    <Typography variant="h6">Add New {childKey}</Typography>
                    <div className="flex flex-row gap-3">
                      <TextField
                        fullWidth
                        label="Label"
                        value={newChild.label}
                        onChange={(e) =>
                          setNewChild({ ...newChild, label: e.target.value })
                        }
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Name"
                        value={newChild.name}
                        onChange={(e) =>
                          setNewChild({ ...newChild, name: e.target.value })
                        }
                        margin="normal"
                      />
                    </div>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleAddChild}
                      sx={{ mt: 2 }}
                    >
                      Add {childKey}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Renderer;
