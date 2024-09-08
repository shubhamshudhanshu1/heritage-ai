import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const API_URL = "/api/settingSchema";

// Thunk for fetching setting schemas
export const fetchSettingSchemas = createAsyncThunk(
  "settingSchema/fetchSettingSchemas",
  async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch setting schemas");
    }
    return response.json();
  }
);

// Thunk for creating a new setting schema
export const createSettingSchema = createAsyncThunk(
  "settingSchema/createSettingSchema",
  async (settingSchemaData) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settingSchemaData),
    });
    if (!response.ok) {
      throw new Error("Failed to create setting schema");
    }
    return response.json();
  }
);

// Thunk for updating an existing setting schema
export const updateSettingSchema = createAsyncThunk(
  "settingSchema/updateSettingSchema",
  async ({ id, updates }) => {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update setting schema");
    }
    return response.json();
  }
);

// Thunk for deleting a setting schema
export const deleteSettingSchema = createAsyncThunk(
  "settingSchema/deleteSettingSchema",
  async (id) => {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete setting schema");
    }
    return id;
  }
);

const settingSchemaSlice = createSlice({
  name: "settingSchema",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingSchemas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSettingSchemas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSettingSchemas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createSettingSchema.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateSettingSchema.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (settingSchema) => settingSchema._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteSettingSchema.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (settingSchema) => settingSchema._id !== action.payload
        );
      });
  },
});

export default settingSchemaSlice.reducer;
