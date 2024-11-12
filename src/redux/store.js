import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { createLogger } from "redux-logger";
import designSlice from "./slices/designSlice";

const logger = createLogger({});

const store = configureStore({
  reducer: {
    user: userSlice,
    design: designSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
