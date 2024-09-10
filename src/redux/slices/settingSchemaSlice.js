import { fetchSettingSchemasApi } from "@/helper/serverCall";
import { segregateByTypeAndSlug, updateChildAtIndexUtil } from "@/helper/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
  schemaMap: {},
};

const API_URL = "/api/settingSchema";

export const fetchSettingSchemas = createAsyncThunk(
  "settingSchema/fetchSettingSchemas",
  async (params) => {
    return fetchSettingSchemasApi(params);
  }
);

export const saveSettingSchema = createAsyncThunk(
  "settingSchema/saveSettingSchema",
  async (settingSchemaData) => {
    const { id, ...data } = settingSchemaData;
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}?id=${id}` : API_URL;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        id
          ? "Failed to update setting schema"
          : "Failed to create setting schema"
      );
    }
    return response.json();
  }
);

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
        state.loading = true;
      })
      .addCase(fetchSettingSchemas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schemaMap = segregateByTypeAndSlug(action.payload);
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSettingSchemas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(saveSettingSchema.fulfilled, (state, action) => {})
      .addCase(deleteSettingSchema.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (settingSchema) => settingSchema._id !== action.payload
        );
      });
  },
});

export default settingSchemaSlice.reducer;
