import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchSettingSchemasApi } from "@/helper/serverCall";
import CommonLabel from "../common/label";

const SelectSchema = ({ apiParams, label, onItemChange }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchSettingSchemasApi(apiParams);
        setItems(response);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, [apiParams]);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItem(selectedValue);
    let selectedItemInd = items.findIndex((ele) => {
      return ele.slug == selectedValue;
    });
    onItemChange(items[selectedItemInd]);
  };

  return (
    <div>
      <FormControl fullWidth required className="mb-2">
        <CommonLabel>{label}</CommonLabel>
        <Select
          value={selectedItem}
          onChange={handleChange}
          fullWidth
          inputProps={{ label: "" }}
        >
          {items?.map((item) => (
            <MenuItem key={item.id} value={item.slug}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSchema;
