// components/TraderInformationSection.js

import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const TraderInformationSection = () => {
  const [traderInfo, setTraderInfo] = useState([]);

  const handleAddTraderInfo = () =>
    setTraderInfo([...traderInfo, { name: `Trader ${traderInfo.length + 1}` }]);

  return (
    <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Trader Information
      </Typography>
      <div className="flex flex-wrap mt-4">
        <div className="w-[140px] h-[140px]  m-2 border-dashed border-2 border-blue-300 rounded-lg p-4 justify-center items-center flex">
          <Button variant="outlined" onClick={handleAddTraderInfo}>
            <Add /> Trader
          </Button>
        </div>
        {traderInfo.map((trader, index) => (
          <div
            key={index}
            className="w-[140px] h-[140px]  m-2 border-dashed border-2 border-blue-300 rounded-lg p-4 justify-center items-center flex">
            <Typography>{trader.name}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraderInformationSection;
