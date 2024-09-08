import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import userSlice from "./slices/userSlice";
import configSlice from "./slices/configSlice";
import tenantSlice from "./slices/tenantSlice";
import settingSchema from "./slices/settingSchemaSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    config: configSlice,
    tenants: tenantSlice,
    settingSchema: settingSchema,
  },
});

export default store;
