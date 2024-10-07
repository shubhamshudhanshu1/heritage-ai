// components/AttributesSection.js

import React from "react";
import { Typography } from "@mui/material";

const AttributesSection = () => {
  return (
    <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Attributes
      </Typography>
      <Typography
        variant="body"
        color="textSecondary"
        align="center"
        sx={{ fontWeight: "bold" }}>
        No Attributes configured for this Product Template.
      </Typography>
    </div>
  );
};

export default AttributesSection;
