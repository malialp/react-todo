import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";

export default configureStore({
  reducer: {
    todos: todoSlice,
  },
});
