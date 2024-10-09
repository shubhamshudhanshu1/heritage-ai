"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSearchParams } from "next/navigation";
import { fetchSettingSchemasApi } from "@/helper/serverCall";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const UpdateTenant = () => {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId");

  const [tenantData, setTenantData] = useState({
    tenantName: "",
    description: "",
    adminUsers: [], // This will store user IDs
    userTypes: [], // Each user type will have a name and a label
  });

  const [users, setUsers] = useState([]); // Store user data with both ID and email
  const [settings, setSettings] = useState([]); // Store page data with both ID and name
  const [userTypeInput, setUserTypeInput] = useState({ name: "", label: "" });
  const [selectedPages, setSelectedPages] = useState([]); // Store page IDs

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data.data); // Now store full user data (with IDs)
    };

    const fetchSettingSchemas = async (apiParams = {}) => {
      try {
        const response = await fetchSettingSchemasApi(apiParams);
        setSettings(response); // Now store full settings data (with IDs)
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    const fetchTenantDetails = async (tenantId) => {
      if (tenantId) {
        const response = await fetch(`/api/tenants?tenantId=${tenantId}`);
        const data = await response.json();
        setTenantData(data.data[0]);
        setSelectedPages(data.data[0]?.pages || []);
      }
    };

    fetchUsers();
    fetchSettingSchemas({ type: "page" });
    fetchTenantDetails(tenantId);
  }, [tenantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleAddAdminUser = (userId) => {
    setTenantData((prev) => ({
      ...prev,
      adminUsers: [...prev.adminUsers, userId],
    }));
  };

  const handleRemoveAdminUser = (userId) => {
    setTenantData((prev) => ({
      ...prev,
      adminUsers: prev.adminUsers.filter((user) => user !== userId),
    }));
  };

  const handleAddUserType = () => {
    if (userTypeInput.name && userTypeInput.label) {
      setTenantData((prev) => ({
        ...prev,
        userTypes: [
          ...prev.userTypes,
          { name: userTypeInput.name, label: userTypeInput.label },
        ],
      }));
      setUserTypeInput({ name: "", label: "" });
    }
  };

  const handleRemoveUserType = (index) => {
    setTenantData((prev) => ({
      ...prev,
      userTypes: prev.userTypes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare tenant data, including page IDs and user IDs for the API request
      const updatedData = {
        ...tenantData,
        pages: selectedPages, // Page IDs
        adminUsers: tenantData.adminUsers, // User IDs
        userTypes: tenantData.userTypes.map((type) => ({
          name: type.name,
          label: type.label,
        })),
      };

      const response = await fetch(`/api/tenants/${tenantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update tenant");
      }

      const updatedTenant = await response.json();
      console.log("Tenant updated successfully:", updatedTenant);
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  console.log({ users });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Update Tenant
      </Typography>

      <TextField
        label="Tenant Name"
        name="tenantName"
        value={tenantData.tenantName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={tenantData.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <Typography variant="h6" mt={4} mb={2}>
        Admin Users
      </Typography>
      <Autocomplete
        multiple
        options={users || []}
        getOptionLabel={(option) => option.email}
        value={tenantData.users}
        onChange={(e, newValue) => {
          setTenantData({
            ...tenantData,
            adminUsers: newValue,
          });
        }}
        renderInput={(params) => <TextField {...params} label="Admin Users" />}
      />

      <Typography variant="h6" mt={4} mb={2}>
        Add User Types
      </Typography>

      {tenantData.userTypes?.map((userType, index) => (
        <Box key={index} mb={2} className="flex flex-row justify-between">
          <Typography variant="body1">{userType.label}</Typography>
          <IconButton onClick={() => handleRemoveUserType(index)}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      ))}
      <div className="flex flex-row justify-between items-center gap-2">
        <TextField
          label="User Type Name"
          value={userTypeInput.name}
          onChange={(e) =>
            setUserTypeInput({ ...userTypeInput, name: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="User Type Label"
          value={userTypeInput.label}
          onChange={(e) =>
            setUserTypeInput({ ...userTypeInput, label: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={handleAddUserType}
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </div>

      <Typography variant="h6" mt={4} mb={2}>
        Pages (Accessible by Tenant)
      </Typography>

      <Autocomplete
        multiple
        options={settings || []}
        getOptionLabel={(option) => option.name}
        value={selectedPages}
        onChange={(e, newValue) => setSelectedPages(newValue)}
        renderInput={(params) => <TextField {...params} label="Pages" />}
      />

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Tenant
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateTenant;
