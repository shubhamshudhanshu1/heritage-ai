import React, { useState } from "react";
import { Typography, Button, Switch } from "@mui/material";
import { Add } from "@mui/icons-material";

const SizesSection = () => {
  const [multiSizeEnabled, setMultiSizeEnabled] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleAddSize = () =>
    setSizes([...sizes, { name: `Size ${sizes.length + 1}` }]);

  return (
    <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Sizes
        </Typography>
        <div className="flex items-center">
          <Typography variant="body2">Multi Size enabled</Typography>
          <Switch
            checked={multiSizeEnabled}
            onChange={() => setMultiSizeEnabled(!multiSizeEnabled)}
            color="primary"
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-[140px] h-[140px]  m-2 border-dashed border-2 border-blue-300 rounded-lg p-4 justify-center items-center flex">
          <Button
            className="w-fit h-fit"
            variant="outlined"
            onClick={handleAddSize}>
            <Add /> Size
          </Button>
        </div>
        {sizes.map((size, index) => (
          <div
            key={index}
            className="w-[140px] h-[140px]  m-2 border-dashed border-2 border-blue-300 rounded-lg p-4 justify-center items-center flex">
            <Typography>{size.name}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizesSection;
