import { createSlice } from "@reduxjs/toolkit";

const defaultTheme = localStorage.getItem("theme")
const initialState = { theme: defaultTheme ? defaultTheme : "light" }

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      localStorage.setItem("theme", action.payload)
      state.theme = action.payload;
    },
  }
});

export const { changeTheme } = themeSlice.actions;

export const selectTheme = (state: any) => state.theme.theme

export default themeSlice.reducer;
