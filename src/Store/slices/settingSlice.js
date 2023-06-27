import { createSlice } from "@reduxjs/toolkit";

const initSettings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  if (settings) {
    return { value: settings };
  }

  const defaultSettings = {
    theme: "dark",
  };

  return { value: defaultSettings };
};

const settingSlice = createSlice({
  name: "settings",
  initialState: initSettings(),
  reducers: {
    updateSettings: (state, action) => {
      state.value = { ...state.value, ...action.payload };

      if (state.value.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("settings", JSON.stringify(state.value));
    },
  },
});

export const { updateSettings } = settingSlice.actions;
export default settingSlice.reducer;
