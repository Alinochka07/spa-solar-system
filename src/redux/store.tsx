import { configureStore } from "@reduxjs/toolkit";
import { alliancesFetch, rootReducer} from "./slicer";



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: alliancesFetch,
      },
      serializableCheck: false,
    }),
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
