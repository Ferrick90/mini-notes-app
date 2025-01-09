import { describe, it, expect, vi } from 'vitest';
import notesReducer, { setNotes, addNote, deleteNote, updateNote } from '../store/notesSlice'; // Adjust the import path
import { Note } from '../models/note';

// Mocking the localStorage functions
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
});

describe('notesSlice', () => {
  // Sample initial state for testing
  const initialState = {
    notes: [
      { id: '1', name: 'Note 1', text: 'Note content 1', date: 123456789, folder: '/' },
      { id: '2', name: 'Note 2', text: 'Note content 2', date: 987654321, folder: '/' },
    ] as Note[],
  };

  it('should handle setNotes action', () => {
    const newNotes = [
      { id: '3', name: 'Note 3', text: 'Note content 3', date: 112233445, folder: '/' },
    ] as Note[];

    const state = notesReducer(initialState, setNotes(newNotes));

    // Verify the state is updated
    expect(state.notes).toEqual(newNotes);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'notes-data',
      JSON.stringify(newNotes)
    );
  });

  it('should handle addNote action', () => {
    const newNote = { id: '3', name: 'Note 3', text: 'Note content 3', date: 112233445, folder: '/' } as Note;

    const state = notesReducer(initialState, addNote(newNote));

    // Verify the note is added to the state
    expect(state.notes).toHaveLength(3);
    expect(state.notes).toContainEqual(newNote);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'notes-data',
      JSON.stringify([...initialState.notes, newNote])
    );
  });

  it('should handle deleteNote action', () => {
    const noteToDelete = { id: '1', name: 'Note 1', text: 'Note content 1', date: 123456789, folder: '/' } as Note;

    const state = notesReducer(initialState, deleteNote(noteToDelete));

    // Verify the note is deleted from the state
    expect(state.notes).toHaveLength(1);
    expect(state.notes).not.toContainEqual(noteToDelete);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'notes-data',
      JSON.stringify([initialState.notes[1]])
    );
  });

  it('should handle updateNote action', () => {
    const updatedNote = { id: '1', name: 'Updated Note 1', text: 'Updated content', date: 123456789, folder: '/' } as Note;

    const state = notesReducer(initialState, updateNote(updatedNote));

    // Verify the note is updated in the state
    expect(state.notes).toContainEqual(updatedNote);
    expect(state.notes[0].name).toBe('Updated Note 1');

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'notes-data',
      JSON.stringify([updatedNote, initialState.notes[1]])
    );
  });

  it('should return the initial state when no action is passed', () => {
    const state = notesReducer(undefined, { type: '' });

    expect(state).toEqual({ notes: [] });
  });
});
