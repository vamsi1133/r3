import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./reducers/itemReducer";

const reducer = {
  items: itemReducer,
};
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
