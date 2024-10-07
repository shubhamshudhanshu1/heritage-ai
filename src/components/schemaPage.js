"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingSchemas,
  saveSettingSchema,
  deleteSettingSchema,
} from "@/redux/slices/settingSchemaSlice";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RenderSchema from "./settingSchema/RenderSchema";

function Schema({ type, title }) {
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
    type: type,
    tenantName: "",
    settings: [],
    blocks: [],
  });

  useEffect(() => {
    dispatch(fetchSettingSchemas({}));
  }, [dispatch]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
    setEditId(null);
    setNewSchema({
      name: "",
      slug: "",
      type: type,
      tenantName: "",
      settings: [],
      blocks: [],
    });
  };

  const handleInputChange = (e) => {
    setNewSchema({ ...newSchema, [e.target.name]: e.target.value });
  };

  const handleSaveSchema = () => {
    if (isEditing) {
      dispatch(saveSettingSchema({ ...newSchema, _id: editId })).then(() => {
        dispatch(fetchSettingSchemas({}));
      });
    } else {
      dispatch(saveSettingSchema(newSchema)).then(() => {
        dispatch(fetchSettingSchemas({}));
      });
    }
    handleCloseModal();
  };

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

  const handleDeleteSchema = (id) => {
    if (window.confirm("Are you sure you want to delete this schema?")) {
      dispatch(deleteSettingSchema(id)).then(() => {
        dispatch(fetchSettingSchemas({}));
      });
    }
  };

  const handleValueChange = (key, value) => {
    setNewSchema({ ...newSchema, [key]: value });
  };

  return (
    <div>
      <div className="w-full flex flex-row justify-between">
        <Typography variant="h6">{title}s</Typography>
        <Button onClick={handleOpenModal}>Add {title}</Button>
      </div>
      {fetchingSchema ? (
        <p>Loading...</p>
      ) : (
        <div>
          {settings
            ?.filter((schema) => schema.type === type)
            .map((schema) => (
              <Box
                key={schema._id}
                sx={{ border: "1px solid #ddd", padding: 2, margin: 2 }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">{schema.name}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditSchema(schema)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteSchema(schema._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2">{schema.slug}</Typography>
                {/* <Typography variant="body2">Type: {schema.type}</Typography> */}
                <Typography className="mt-4" variant="body">
                  Settings
                </Typography>
                <RenderSchema
                  levelJson={{ settings: schema.settings }}
                  path={[]}
                  schemaEditMode={false}
                  onChangeSettings={(newSettings) =>
                    handleValueChange("settings", newSettings)
                  }
                  isCardView={true}
                />
              </Box>
            ))}
        </div>
      )}

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
            {isEditing ? `Edit ${title}` : `Add ${title}`}
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
          <div className="my-4">
            <Typography variant="body">Settings</Typography>
            <RenderSchema
              levelJson={{ settings: newSchema.settings }}
              path={[]}
              schemaEditMode={true}
              onChangeSettings={(newSettings) =>
                handleValueChange("settings", newSettings)
              }
            />
          </div>

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

export default Schema;
