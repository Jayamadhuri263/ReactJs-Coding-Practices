import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit.slice.js";

export const store = configureStore({
    name: "store",
    reducer: {
        habits: habitReducer,
    },
})

