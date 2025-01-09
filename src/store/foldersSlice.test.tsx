import { describe, it, expect, vi } from 'vitest';
import foldersReducer, { setFolders, addFolder, deleteFolder, updateFolder } from '../store/foldersSlice'; // Adjust the import path
import { Folder } from '../models/folder';

// Mocking the localStorage functions
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
});

describe('foldersSlice', () => {
  // Sample initial state for testing
  const initialState = {
    folders: [
      { id: '1', name: 'Folder 1', slug: '/folder-1', date: 123456789 },
      { id: '2', name: 'Folder 2', slug: '/folder-2', date: 987654321 },
    ] as Folder[],
  };

  it('should handle setFolders action', () => {
    const newFolders = [
      { id: '3', name: 'Folder 3', slug: '/folder-3', date: 112233445 },
    ] as Folder[];

    const state = foldersReducer(initialState, setFolders(newFolders));

    // Verify the state is updated
    expect(state.folders).toEqual(newFolders);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'folders-data',
      JSON.stringify(newFolders)
    );
  });

  it('should handle addFolder action', () => {
    const newFolder = { id: '3', name: 'Folder 3', slug: '/folder-3', date: 112233445 } as Folder;

    const state = foldersReducer(initialState, addFolder(newFolder));

    // Verify the folder is added to the state
    expect(state.folders).toHaveLength(3);
    expect(state.folders).toContainEqual(newFolder);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'folders-data',
      JSON.stringify([...initialState.folders, newFolder])
    );
  });

  it('should handle deleteFolder action', () => {
    const folderToDelete = { id: '1', name: 'Folder 1', slug: '/folder-1', date: 123456789 } as Folder;

    const state = foldersReducer(initialState, deleteFolder(folderToDelete));

    // Verify the folder is deleted from the state
    expect(state.folders).toHaveLength(1);
    expect(state.folders).not.toContainEqual(folderToDelete);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'folders-data',
      JSON.stringify([initialState.folders[1]])
    );
  });

  it('should handle updateFolder action', () => {
    const updatedFolder = { id: '1', name: 'Updated Folder 1', slug: '/folder-1-updated', date: 123456789 } as Folder;

    const state = foldersReducer(initialState, updateFolder(updatedFolder));

    // Verify the folder is updated in the state
    expect(state.folders).toContainEqual(updatedFolder);
    expect(state.folders[0].name).toBe('Updated Folder 1');

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'folders-data',
      JSON.stringify([updatedFolder, initialState.folders[1]])
    );
  });

  it('should return the initial state when no action is passed', () => {
    const state = foldersReducer(undefined, { type: '' });

    expect(state).toEqual({ folders: [] });
  });
});
