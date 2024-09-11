"use client";

import React, { useState } from "react";
import { Typography, IconButton, TextField, Button } from "@mui/material";
import { Add, Delete, DragIndicator } from "@mui/icons-material";

const HighlightsSection = () => {
  const [highlights, setHighlights] = useState([]);

  const handleAddHighlight = () => setHighlights([...highlights, ""]);

  const handleRemoveHighlight = (index) =>
    setHighlights(highlights.filter((_, i) => i !== index));

  return (
    <div className="p-4 rounded-lg  bg-white flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Highlights
        </Typography>
        <IconButton
          sx={{
            border: "1px solid #E4E5E6",
            borderRadius: 0,
            color: "#2E31BE",
          }}
          color="primary"
          onClick={() => handleAddHighlight()}>
          <Add />
        </IconButton>
      </div>

      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-center mb-2">
          <IconButton onClick={() => handleRemoveHighlight(index)}>
            <DragIndicator />
          </IconButton>
          <TextField
            fullWidth
            placeholder="For eg. All day battery backup"
            value={highlight}
            onChange={(e) => {
              const newHighlights = [...highlights];
              newHighlights[index] = e.target.value;
              setHighlights(newHighlights);
            }}
          />
          <IconButton
            color="error"
            onClick={() => handleRemoveHighlight(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default HighlightsSection;
