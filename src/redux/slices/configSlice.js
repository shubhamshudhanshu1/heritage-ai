import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingsSchema from "../../../schema";
import {
  addChildUtil,
  deleteChildUtil,
  getTarget,
  getTargetAndClone,
  updateChildAtIndexUtil,
} from "@/helper/utils";

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

export const updateConfig = createAsyncThunk(
  "config/updateConfig",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { tenant, userType } = state.config;
    console.log(state.config, "state.config");
    const { settings, props, pages = [] } = state.config?.config;

    try {
      const response = await fetch(`/api/config/${tenant}/${userType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings,
          props,
          pages,
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

    deleteSettings(state, action) {
      const { path, index } = action.payload;
      const target = getTarget(state.config, path);
      if (target && Array.isArray(target.settings)) {
        if (index >= 0 && index < target.settings.length) {
          target.settings.splice(index, 1);
        }
      }
    },

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

    overrideSettings(state, action) {
      const { path, settings } = action.payload;
      const target = getTarget(state.config, path);
      if (target) {
        target.settings = settings;
      }
    },

    addOrUpdateProp(state, action) {
      const { path, propKey, propValue } = action.payload;
      const target = getTarget(state.config, path);
      if (target && target.props) {
        target.props[propKey] = propValue;
      }
    },

    deleteProp(state, action) {
      const { path, propKey } = action.payload;
      const target = getTarget(state.config, path);
      if (target && target.props && target.props.hasOwnProperty(propKey)) {
        delete target.props[propKey];
      }
    },

    addChild(state, action) {
      const { path, newChild, childKey } = action.payload;
      state.config = addChildUtil(state.config, path, childKey, newChild);
    },
    deleteChild(state, action) {
      const { path } = action.payload;
      state.config = deleteChildUtil(state.config, path);
    },
    updateChild(state, action) {
      const { path, index, childKey, updatedChild } = action.payload;
      state.config = updateChildAtIndexUtil(
        state.config,
        path,
        childKey,
        index,
        updatedChild
      );
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
      .addCase(updateConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload.data;
      })
      .addCase(updateConfig.rejected, (state, action) => {
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

  addChild,
  deleteChild,
  updateChild,
} = configSlice.actions;

export default configSlice.reducer;
