import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  IconButton,
} from "@mui/material";
import CommonLabel from "../common/label";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

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

let INITIAL_OPTIONS = [];

const AddSchema = ({
  onAddSchema,
  setModalOpen,
  modalOpen,
  defaultSchema = {},
  onEditSchema,
}) => {
  const [newSchema, setNewSchema] = useState(INITIAL_SCHEMA);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (defaultSchema.options?.length) {
      setOptions(defaultSchema.options);
    } else {
      setOptions(INITIAL_OPTIONS);
    }
    if (Object.keys(defaultSchema).length) {
      setNewSchema(defaultSchema);
    } else {
      setNewSchema(INITIAL_SCHEMA);
    }
  }, [defaultSchema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((s) => {
      delete s[name];
      return s;
    });
    setNewSchema((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, e) => {
    const { name, value } = e.target;
    const newOptions = options.map((option, idx) =>
      idx === index ? { ...option, [name]: value } : option
    );
    setOptions(newOptions);
  };

  const addNewOptionRow = () => {
    setOptions([...options, { label: "", value: "" }]);
  };

  const deleteOptionRow = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newSchema.type) newErrors.type = "Type is required";
    if (!newSchema.default) newErrors.default = "Default value is required";
    if (!newSchema.id) newErrors.id = "Id is required";
    if (!newSchema.label) newErrors.label = "Label is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onClose = () => {
    setModalOpen(false);
    setOptions(INITIAL_OPTIONS);
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const updatedSchema = {
      ...newSchema,
      options,
    };

    if (defaultSchema.id) {
      onEditSchema(updatedSchema);
    } else {
      onAddSchema(updatedSchema);
    }

    onClose();
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
            maxHeight: "90vh",
            overflow: "scroll",
          }}
        >
          <Typography variant="h6" mb={2}>
            {defaultSchema.id ? "Edit" : "Add"} Schema
          </Typography>
          <div className="flex flex-col gap-3 mb-4">
            <FormControl fullWidth required>
              <CommonLabel>Type</CommonLabel>
              <TextField
                select
                fullWidth
                name="type"
                value={newSchema.type}
                onChange={handleChange}
                error={!!errors.type}
                helperText={errors.type}
              >
                {schemaTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl fullWidth required>
              <CommonLabel>Default value</CommonLabel>
              <TextField
                fullWidth
                name="default"
                value={newSchema.default}
                onChange={handleChange}
                error={!!errors.default}
                helperText={errors.default}
              />
            </FormControl>

            <FormControl fullWidth required>
              <CommonLabel>Id</CommonLabel>
              <TextField
                fullWidth
                name="id"
                value={newSchema.id}
                onChange={handleChange}
                error={!!errors.id}
                helperText={errors.id}
              />
            </FormControl>

            <FormControl fullWidth>
              <CommonLabel>Info</CommonLabel>
              <TextField
                fullWidth
                name="info"
                value={newSchema.info}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth required>
              <CommonLabel>Label</CommonLabel>
              <TextField
                fullWidth
                name="label"
                value={newSchema.label}
                onChange={handleChange}
                error={!!errors.label}
                helperText={errors.label}
              />
            </FormControl>

            {newSchema.type === "select" && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Add Options
                </Typography>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <FormControl fullWidth required>
                      <CommonLabel>{`Label ${index + 1}`}</CommonLabel>
                      <TextField
                        fullWidth
                        name="label"
                        value={option.label}
                        onChange={(e) => handleOptionChange(index, e)}
                      />
                    </FormControl>
                    <FormControl fullWidth required>
                      <CommonLabel>{`Value ${index + 1}`}</CommonLabel>
                      <TextField
                        fullWidth
                        name="value"
                        value={option.value}
                        onChange={(e) => handleOptionChange(index, e)}
                      />
                    </FormControl>
                    <IconButton onClick={() => deleteOptionRow(index)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                ))}

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={addNewOptionRow}
                  fullWidth
                >
                  Add Another Option
                </Button>
              </>
            )}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
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
