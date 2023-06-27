import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import settingSlice from "./slices/settingSlice";

export default configureStore({
  reducer: {
    todos: todoSlice,
    settings: settingSlice,
  },
});
