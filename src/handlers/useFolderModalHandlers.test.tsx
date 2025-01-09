import { renderHook, act } from "@testing-library/react";
import { useFolderModalHandlers } from "./useFolderModalHandlers";
import { describe, it, expect } from "vitest";
import { Folder } from "../models/folder";

describe("useFolderModalHandlers", () => {
  it("should initialize with default values when folder is null", () => {
    const { result } = renderHook(() => useFolderModalHandlers(null));

    expect(result.current.name).toBe("");
    expect(result.current.showError).toBe(false);
  });

  it("should initialize with folder name when folder is provided", () => {
    const mockFolder: Folder = {
      id: "1",
      name: "Test Folder",
      slug: "test-folder",
      date: 12312312,
    };

    const { result } = renderHook(() => useFolderModalHandlers(mockFolder));

    expect(result.current.name).toBe("Test Folder");
    expect(result.current.showError).toBe(false);
  });

  it("should update the name state when setName is called", () => {
    const { result } = renderHook(() => useFolderModalHandlers(null));

    act(() => {
      result.current.setName("Updated Folder Name");
    });

    expect(result.current.name).toBe("Updated Folder Name");
  });

  it("should set showError to true if name is empty on validation", async () => {
    const { result } = renderHook(() => useFolderModalHandlers(null));

    act(() => {
      result.current.setName("");
    });

    await act(async () => {
      // Now validate inputs after state updates are complete
      const isValid = result.current.validateInput();
      expect(isValid).toBe(false);
    });

    expect(result.current.showError).toBe(true);
  });

  it("should set showError to false if name is provided on validation", async () => {
    const { result } = renderHook(() => useFolderModalHandlers(null));

    act(() => {
      result.current.setName("Valid Folder Name");
    });

    await act(async () => {
      // Now validate inputs after state updates are complete
      const isValid = result.current.validateInput();
      expect(isValid).toBe(true);
    });

    expect(result.current.showError).toBe(false);
  });

  it("should reset modal values when resetModal is called", () => {
    const { result } = renderHook(() => useFolderModalHandlers(null));

    act(() => {
      result.current.setName("Folder Name");
      result.current.resetModal();
    });

    expect(result.current.name).toBe("");
    expect(result.current.showError).toBe(false);
  });
});
