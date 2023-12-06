import { configureStore } from "@reduxjs/toolkit";
import fractionReducer from "./slicer";


export const store = configureStore({
    reducer: {
        fractions: fractionReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;