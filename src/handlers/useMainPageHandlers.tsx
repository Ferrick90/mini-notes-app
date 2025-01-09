import { useState } from 'react';
import { Folder } from '../models/folder';
import { Note } from '../models/note';

export const useMainPageHandlers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [folder, setFolder] = useState<Folder | null>(null);
  const [note, setNote] = useState<Note | null>(null);

  const openCreateFolderModal = () => {
    setIsCreateFolderModalOpen(true);
    setIsCreateNoteModalOpen(false);
  };

  const openCreateNoteModal = () => {
    setIsCreateFolderModalOpen(false);
    setIsCreateNoteModalOpen(true);
  };

  const closeModel = () => {
    setIsCreateFolderModalOpen(false);
    setIsCreateNoteModalOpen(false);
    setFolder(null);
    setNote(null);
  };

  const editNote = (note: Note) => {
    setNote(note);
    openCreateNoteModal();
  };

  const editFolder = (folder: Folder) => {
    setFolder(folder);
    openCreateFolderModal();
  };

  return {
    searchQuery,
    isCreateNoteModalOpen,
    isCreateFolderModalOpen,
    folder,
    note,
    setSearchQuery,
    openCreateFolderModal,
    openCreateNoteModal,
    closeModel,
    editNote,
    editFolder,
  };
};