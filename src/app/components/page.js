"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingSchemas,
  saveSettingSchema,
  deleteSettingSchema, // Assuming a delete action is in the same slice.
} from "@/redux/slices/settingSchemaSlice"; // Adjust the import if needed
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import RenderSchema from "./../../components/settingSchema/RenderSchema";

function Components() {
  const dispatch = useDispatch();
  const { data: settings, loading: fetchingSchema } = useSelector(
    (state) => state.settingSchema
  );
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newSchema, setNewSchema] = useState({
    name: "",
    slug: "",
    type: "section", // default to "section"
    tenantName: "",
    settings: [],
    blocks: [],
  });

  // Fetch schemas on component load
  useEffect(() => {
    dispatch(fetchSettingSchemas({}));
  }, [dispatch]);

  // Handle modal open/close
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
    setEditId(null);
    setNewSchema({
      name: "",
      slug: "",
      type: "section",
      tenantName: "",
      settings: [],
      blocks: [],
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewSchema({ ...newSchema, [e.target.name]: e.target.value });
  };

  // Handle Add or Edit schema
  const handleSaveSchema = () => {
    if (isEditing) {
      dispatch(saveSettingSchema({ ...newSchema, _id: editId })); // Pass ID for editing
    } else {
      dispatch(saveSettingSchema(newSchema)); // No ID, creating new
    }
    handleCloseModal();
  };

  // Handle Edit Button Click
  const handleEditSchema = (schema) => {
    setNewSchema({
      name: schema.name,
      slug: schema.slug,
      type: schema.type,
      tenantName: schema.tenantName,
      settings: schema.settings || [],
      blocks: schema.blocks || [],
    });
    setIsEditing(true);
    setEditId(schema._id);
    handleOpenModal();
  };

  // Handle Delete Button Click
  const handleDeleteSchema = (id) => {
    if (window.confirm("Are you sure you want to delete this schema?")) {
      dispatch(deleteSettingSchema(id));
    }
  };

  const handleValueChange = (settingsArr) => {
    console.log(settingsArr);
  };

  return (
    <div>
      <Typography variant="h6">Components</Typography>
      {fetchingSchema ? (
        <p>Loading...</p>
      ) : (
        <div>
          {settings
            ?.filter((schema) => schema.type === "section")
            .map((schema) => (
              <Box
                key={schema._id}
                sx={{ border: "1px solid #ddd", padding: 2, margin: 2 }}
              >
                <Typography variant="h6">{schema.name}</Typography>
                <Typography variant="body2">{schema.slug}</Typography>
                <Typography variant="body2">Type: {schema.type}</Typography>
                <Typography variant="body2">
                  Tenant: {schema.tenantName}
                </Typography>

                {schema.settings.length > 0 ? (
                  <RenderSchema
                    levelJson={{ settings: schema.settings }}
                    path={[]}
                    schemaEditMode={false}
                    onChangeSettings={(newSettings) =>
                      handleValueChange("settings", newSettings)
                    }
                    disableAdd={true}
                  />
                ) : (
                  <Typography variant="body2">No settings available</Typography>
                )}

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditSchema(schema)}
                  sx={{ marginRight: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteSchema(schema._id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
        </div>
      )}

      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New Schema
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: 4,
            boxShadow: 24,
            outline: "none",
          }}
        >
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit Component" : "Add Component"}
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={newSchema.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Slug"
            name="slug"
            value={newSchema.slug}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tenant Name"
            name="tenantName"
            value={newSchema.tenantName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {newSchema.settings.length > 0 ? (
            <RenderSchema
              levelJson={{ settings: newSchema.settings }}
              path={[]}
              schemaEditMode={false}
              onChangeSettings={(newSettings) =>
                handleValueChange("settings", newSettings)
              }
              disableAdd={false}
            />
          ) : (
            <Typography variant="body2">No settings available</Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSchema}
          >
            {isEditing ? "Save Changes" : "Add Schema"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Components;
