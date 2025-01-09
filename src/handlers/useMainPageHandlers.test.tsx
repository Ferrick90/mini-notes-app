import { Folder } from "../models/folder";
import { Note } from "../models/note";
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMainPageHandlers } from "./useMainPageHandlers";

describe("useMainPageHandlers", () => {
  it("should open create folder modal", () => {
    const { result } = renderHook(() => useMainPageHandlers());

    act(() => {
      result.current.openCreateFolderModal();
    });

    expect(result.current.isCreateFolderModalOpen).toBe(true);
    expect(result.current.isCreateNoteModalOpen).toBe(false);
  });

  it("should open create note modal", () => {
    const { result } = renderHook(() => useMainPageHandlers());

    act(() => {
      result.current.openCreateNoteModal();
    });

    expect(result.current.isCreateFolderModalOpen).toBe(false);
    expect(result.current.isCreateNoteModalOpen).toBe(true);
  });

  it("should close all modals", () => {
    const { result } = renderHook(() => useMainPageHandlers());

    act(() => {
      result.current.closeModel();
    });

    expect(result.current.isCreateFolderModalOpen).toBe(false);
    expect(result.current.isCreateNoteModalOpen).toBe(false);
    expect(result.current.folder).toBeNull();
    expect(result.current.note).toBeNull();
  });

  it("should edit note", () => {
    const { result } = renderHook(() => useMainPageHandlers());
    const mockNote: Note = {
      id: "123",
      name: "asd",
      text: "asdad",
      date: 1736299963,
      folder: "",
    };

    act(() => {
      result.current.editNote(mockNote);
    });

    expect(result.current.note).toBe(mockNote);
    expect(result.current.isCreateNoteModalOpen).toBe(true);
  });

  it("should edit folder", () => {
    const { result } = renderHook(() => useMainPageHandlers());
    const mockFolder: Folder = {
      id: "123asd",
      name: "folder a",
      slug: "/12312",
      date: 1736299963,
    };

    act(() => {
      result.current.editFolder(mockFolder);
    });

    expect(result.current.folder).toBe(mockFolder);
    expect(result.current.isCreateFolderModalOpen).toBe(true);
  });
});
