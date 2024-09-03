// features/config/configSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tenant: null,
  userType: null,
  scope: "global",
  page: null,
};

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
});

export const { setUserType, setScope, setPage, resetConfig } =
  configSlice.actions;

export default configSlice.reducer;
