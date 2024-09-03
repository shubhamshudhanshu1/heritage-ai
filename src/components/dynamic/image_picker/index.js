"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const ImageUpload = ({ label, onImageUpload, preview, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        if (onImageUpload) {
          onImageUpload(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleUploadFromUrl = () => {
    setSelectedImage(imageUrl);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box {...props}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      {/* <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload-input"
        type="file"
        onChange={handleImageChange}
      /> */}
      <label htmlFor="image-upload-input">
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            borderRadius: 1,
          }}
          onClick={handleOpenModal}
        >
          {!selectedImage && <Add sx={{ fontSize: 40, color: "#ccc" }} />}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                objectFit: "cover",
              }}
            />
          )}
        </Box>
      </label>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Upload Image
          </Typography>
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={handleImageUrlChange}
            sx={{ mb: 2 }}
          />
          <div>or</div>

          <input
            accept="image/*"
            style={{ display: "none" }}
            id="modal-image-upload-input"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="modal-image-upload-input">
            <Box
              sx={{
                width: 100,
                height: 100,
                border: "2px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                borderRadius: 1,
              }}
            >
              {!selectedImage && <Add sx={{ fontSize: 40, color: "#ccc" }} />}
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          </label>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadFromUrl}
            sx={{ my: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  onImageUpload: PropTypes.func.isRequired,
  preview: PropTypes.bool,
};

ImageUpload.defaultProps = {
  label: "Upload Image",
  preview: true,
};

export default ImageUpload;
