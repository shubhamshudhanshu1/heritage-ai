import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tenants: [],
  currentTenantDetails: {},
  status: "idle",
  error: null,
};

export const fetchTenants = createAsyncThunk(
  "tenants/fetchTenants",
  async () => {
    const response = await fetch(`/api/tenants`);
    if (!response.ok) {
      throw new Error("Failed to fetch tenants");
    }
    const data = await response.json();
    return data.data;
  }
);

export const fetchTenantByFilters = createAsyncThunk(
  "tenants/fetchTenantByFilters",
  async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`/api/tenants?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tenants");
    }

    const data = await response.json();
    return data.data;
  }
);

const tenantSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tenants = action.payload;
      })
      .addCase(fetchTenantByFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentTenantDetails = action.payload[0];
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllTenants = (state) => state.tenants.tenants;
export const selectTenantStatus = (state) => state.tenants.status;
export const selectTenantError = (state) => state.tenants.error;

export default tenantSlice.reducer;
