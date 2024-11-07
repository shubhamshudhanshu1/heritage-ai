import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { createLogger } from "redux-logger";

const logger = createLogger({});

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
