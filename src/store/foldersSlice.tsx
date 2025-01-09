import { createSlice } from "@reduxjs/toolkit";
import { Folder } from "../models/folder";

// Utility Functions
const getFoldersFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedFolders = localStorage.getItem("folders-data");
    return savedFolders ? JSON.parse(savedFolders) : [];
  }
  return [];
};

const saveFoldersToLocalStorage = (folders: Folder[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("folders-data", JSON.stringify(folders));
  }
};

// Initial State
const initialState = {
  folders: getFoldersFromLocalStorage() as Folder[],
};

// Folders Slice
const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
      saveFoldersToLocalStorage(state.folders);
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
      saveFoldersToLocalStorage(state.folders);
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload.id
      );
      saveFoldersToLocalStorage(state.folders);
    },
    updateFolder: (state, action) => {
      state.folders = state.folders.map((folder) =>
        folder.id === action.payload.id ? action.payload : folder
      );
      saveFoldersToLocalStorage(state.folders);
    },
  },
});

export const { setFolders, addFolder, deleteFolder, updateFolder } =
  foldersSlice.actions;

export default foldersSlice.reducer;