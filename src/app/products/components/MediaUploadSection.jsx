import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Grid2,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MediaUploadSection = () => {
  const [media, setMedia] = useState({
    image: [],
    video: [],
    youtube: [],
    model3d: [],
  });

  const handleUpload = (type, files) => {
    const newFiles = Array.from(files);
    setMedia((prevMedia) => ({
      ...prevMedia,
      [type]: [...prevMedia[type], ...newFiles],
    }));
  };

  const handleRemove = (type, index) => {
    setMedia((prevMedia) => ({
      ...prevMedia,
      [type]: prevMedia[type].filter((_, i) => i !== index),
    }));
  };

  const renderMediaUploadItem = (type, label) => (
    <Grid item xs={6} sm={3}>
      <Box
        className="border-dashed border-2 border-blue-300 rounded-lg p-4 text-center relative"
        sx={{
          // maxHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
        <Button
          variant="outlined"
          component="label"
          sx={{ minWidth: 50, minHeight: 50, borderRadius: "50%" }}>
          <AddIcon />
          <input
            type="file"
            hidden
            accept={
              type === "image"
                ? "image/*"
                : type === "video"
                ? "video/*"
                : undefined
            }
            onChange={(e) => handleUpload(type, e.target.files)}
            multiple
          />
        </Button>
        <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
          {label}
        </Typography>
      </Box>
    </Grid>
  );
  const renderMediaPreview = () => (
    <Box className="py-0 h-full rounded-lg flex overflow-auto w-full">
      {Object.entries(media).map(([type, files]) =>
        files.map((file, index) => (
          <div
            key={`${type}-${index}`}
            className="border border-blue-300 mr-3 rounded-lg p-2 relative
            h-full w-11/12 flex-shrink-0"
            style={{
              position: "relative",
              backgroundColor: "#f8f8f8",
              border: "1px dashed #2E31BE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {type === "image" && (
              <img
                src={URL.createObjectURL(file)}
                alt={type}
                style={{ width: "100%", height: "auto", maxHeight: 150 }}
              />
            )}
            {/* Add Video, YouTube, and 3D Model previews as needed */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                top: 8,
                right: 8,
              }}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => console.log(`Edit ${type}`)}>
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemove(type, index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </div>
        ))
      )}
    </Box>
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="media-options grid grid-cols-2 gap-3">
        {renderMediaUploadItem("image", "Image")}
        {renderMediaUploadItem("video", "Video")}
        {renderMediaUploadItem("youtube", "YouTube")}
        {renderMediaUploadItem("model3d", "3D Model")}
      </div>
      {renderMediaPreview()}
    </div>
  );
};

export default MediaUploadSection;
