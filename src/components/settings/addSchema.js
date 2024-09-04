import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addSchemaToConfig } from "@/redux/slices/configSlice";

const schemaTypes = [
  "select",
  "text",
  "color_picker",
  "checkbox",
  "number",
  "image_picker",
];

const AddSchema = ({ onAddSchema }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { tenant, userType, scope } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const [newSchema, setNewSchema] = useState({
    type: "",
    default: "",
    id: "",
    info: "",
    label: "",
    options: [], // options are used only for select type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSchema((prev) => ({ ...prev, [name]: value }));
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const handleAddSchema = async () => {
    try {
      await dispatch(
        addSchemaToConfig({ tenant, userType, scope, newSchema })
      ).unwrap(); // Unwrap the result for error handling
      onAddSchema(newSchema);
    } catch (error) {
      console.error("Failed to add schema:", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => setModalOpen(true)}
      >
        Add Settings
      </Button>
      <Modal open={modalOpen} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Schema
          </Typography>
          <div className="flex flex-col gap-3 mb-4">
            <TextField
              select
              fullWidth
              label="Type"
              name="type"
              value={newSchema.type}
              onChange={handleChange}
              margin="normal"
            >
              {schemaTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Default"
              name="default"
              value={newSchema.default}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="ID"
              name="id"
              value={newSchema.id}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Info"
              name="info"
              value={newSchema.info}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Label"
              name="label"
              value={newSchema.label}
              onChange={handleChange}
              margin="normal"
            />

            {newSchema.type === "select" && (
              <TextField
                fullWidth
                label="Options (comma-separated)"
                name="options"
                value={newSchema.options}
                onChange={(e) =>
                  setNewSchema({
                    ...newSchema,
                    options: e.target.value.split(","),
                  })
                }
                margin="normal"
              />
            )}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSchema}
            fullWidth
          >
            Add Schema
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddSchema;
