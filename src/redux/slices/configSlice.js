import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingsSchema from "../../../schema";
import { getTarget } from "@/helper/utils";

// Async thunks for API calls
export const fetchConfig = createAsyncThunk(
  "config/fetchConfig",
  async ({ tenant, userType }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/config/${tenant}/${userType}`);
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
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { tenant, userType, settings, props } = state.config?.config;
    try {
      const response = await fetch(`/api/config/${tenant}/${userType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings,
          props,
        }),
      });

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
  async ({ tenant, userType, settings, props, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/config/${tenant}/${userType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          settings,
          props,
        }),
      });
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
  async ({ tenant, userType, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/config/${tenant}/${userType}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
        }),
      });
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
  page: null,
  config: {
    settings: [],
    props: {},
    sections: [],
  },
  loading: false,
  error: null,
  schemaEditMode: false,
};

// Config slice
const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setSchemaEditMode(state, action) {
      state.schemaEditMode = action.payload;
    },
    setTenant(state, action) {
      state.tenant = action.payload;
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetConfig(state) {
      return initialState;
    },
    overrideSettings(state, action) {
      state.config.settings = action.payload;
    },
    addSettings(state, action) {
      const { path, newSetting } = action.payload;
      const target = getTarget(state.config, path);
      if (target && Array.isArray(target.settings)) {
        target.settings.push(newSetting);
      }
    },

    // Delete a setting by index at the specified path
    deleteSettings(state, action) {
      const { path, index } = action.payload;
      const target = getTarget(state.config, path);
      if (target && Array.isArray(target.settings)) {
        if (index >= 0 && index < target.settings.length) {
          target.settings.splice(index, 1);
        }
      }
    },

    // Update a setting at a specified path and index
    editSettings(state, action) {
      const { path, index, updatedSetting } = action.payload;
      const target = getTarget(state.config, path);
      if (target && Array.isArray(target.settings)) {
        if (target.settings[index]) {
          target.settings[index] = {
            ...target.settings[index],
            ...updatedSetting,
          };
        }
      }
    },

    // Override settings at the specified path
    overrideSettings(state, action) {
      const { path, settings } = action.payload;
      const target = getTarget(state.config, path);
      if (target) {
        target.settings = settings;
      }
    },

    // Add or update a property in the props object at the specified path
    addOrUpdateProp(state, action) {
      const { path, propKey, propValue } = action.payload;
      const target = getTarget(state.config, path);
      if (target && target.props) {
        target.props[propKey] = propValue;
      }
    },

    // Delete a property from the props object at the specified path
    deleteProp(state, action) {
      const { path, propKey } = action.payload;
      const target = getTarget(state.config, path);
      if (target && target.props && target.props.hasOwnProperty(propKey)) {
        delete target.props[propKey];
      }
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
        state.config = settingsSchema;
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
        state.config = action.payload.data;
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

export const {
  setTenant,
  setUserType,
  setPage,
  resetConfig,
  onChangeProp,
  setSchemaEditMode,

  addSettings,
  deleteSettings,
  editSettings,
  overrideSettings,
  addOrUpdateProp,
  deleteProp,
} = configSlice.actions;

export default configSlice.reducer;
