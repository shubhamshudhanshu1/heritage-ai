import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const schemaTypes = [
  "select",
  "text",
  "color_picker",
  "checkbox",
  "number",
  "image_picker",
];

let INITIAL_SCHEMA = {
  type: "",
  default: "",
  id: "",
  info: "",
  label: "",
  options: [],
};

const AddSchema = ({
  onAddSchema,
  setModalOpen,
  modalOpen,
  defaultSchema = {},
  onEditSchema,
}) => {
  const [newSchema, setNewSchema] = useState(INITIAL_SCHEMA);

  useEffect(() => {
    if (defaultSchema.id) {
      setNewSchema(defaultSchema);
    }
  }, [defaultSchema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSchema((prev) => ({ ...prev, [name]: value }));
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => {
          setNewSchema(INITIAL_SCHEMA);
          setModalOpen(true);
        }}
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
            {defaultSchema.id ? "Edit" : "Add"} Schema
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
            onClick={() => {
              if (defaultSchema.id) {
                onEditSchema(newSchema);
              } else {
                onAddSchema(newSchema);
              }
              onClose();
            }}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddSchema;
