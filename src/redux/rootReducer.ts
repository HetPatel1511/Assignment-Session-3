import {combineReducers}  from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.ts";
import cartReducer from "./slices/cartSlice.ts";

export default combineReducers({
    theme: themeReducer,
    cart: cartReducer
})