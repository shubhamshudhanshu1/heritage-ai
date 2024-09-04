import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for API calls
export const fetchConfig = createAsyncThunk(
  "config/fetchConfig",
  async ({ tenant, userType, scope }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/config/${tenant}/${userType}/${scope}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSchemaToConfig = createAsyncThunk(
  "config/addSchemaToConfig",
  async ({ tenant, userType, scope, newSchema }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/config/${tenant}/${userType}/${scope}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            settings: [newSchema],
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSchemaInConfig = createAsyncThunk(
  "config/updateSchemaInConfig",
  async (
    { tenant, userType, scope, settings, props, page },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `/api/config/${tenant}/${userType}/${scope}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page,
            settings,
            props,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteConfig = createAsyncThunk(
  "config/deleteConfig",
  async ({ tenant, userType, scope, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/config/${tenant}/${userType}/${scope}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  tenant: null,
  userType: null,
  scope: "global",
  page: null,
  config: null,
  loading: false,
  error: null,
};

// Config slice
const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setTenant(state, action) {
      state.tenant = action.payload;
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setScope(state, action) {
      state.scope = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetConfig(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSchemaToConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchemaToConfig.fulfilled, (state, action) => {
        state.loading = false;
        if (state.config && state.config.settings) {
          state.config.settings.push(...action.payload.settings);
        }
      })
      .addCase(addSchemaToConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSchemaInConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchemaInConfig.fulfilled, (state, action) => {
        state.loading = false;
        if (state.config) {
          state.config.settings = action.payload.settings;
          state.config.props = action.payload.props;
        }
      })
      .addCase(updateSchemaInConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConfig.fulfilled, (state) => {
        state.loading = false;
        state.config = null;
      })
      .addCase(deleteConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTenant, setUserType, setScope, setPage, resetConfig } =
  configSlice.actions;

export default configSlice.reducer;
