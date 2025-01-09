import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../models/note";

// Utility function to get notes from localStorage
const getNotesFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedNotes = localStorage.getItem("notes-data");
    return savedNotes ? JSON.parse(savedNotes) : [];
  }
  return [];
};

// Utility function to save notes to localStorage
const saveNotesToLocalStorage = (notes: Note[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("notes-data", JSON.stringify(notes));
  }
};

// Initial State
const initialState = {
  notes: getNotesFromLocalStorage() as Note[],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
      saveNotesToLocalStorage(state.notes); // Save to localStorage
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
      saveNotesToLocalStorage(state.notes); // Save to localStorage
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(
        (note: Note) => note.id !== action.payload.id
      );
      saveNotesToLocalStorage(state.notes); // Save to localStorage
    },
    updateNote: (state, action) => {
      const updatedNotes = state.notes.map((note: Note) =>
        note.id === action.payload.id ? action.payload : note
      );
      state.notes = updatedNotes;
      saveNotesToLocalStorage(state.notes); // Save to localStorage
    },
  },
});

export const { setNotes, addNote, deleteNote, updateNote } = notesSlice.actions;

export default notesSlice.reducer;
