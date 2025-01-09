import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import foldersReducer from "./foldersSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      notes: notesReducer,
      folders: foldersReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
