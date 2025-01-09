import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFloatingButtonHandlers } from "./useFloatingButtonHandlers";

describe("useFloatingButtonHandlers", () => {
  it("should toggle the menu state", () => {
    const mockIsSelectedNewFolder = vi.fn();
    const mockIsSelectedNewNote = vi.fn();

    const { result } = renderHook(() =>
      useFloatingButtonHandlers(mockIsSelectedNewFolder, mockIsSelectedNewNote)
    );

    // Initial state
    expect(result.current.isMenuOpen).toBe(false);

    // Toggle menu open
    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.isMenuOpen).toBe(true);

    // Toggle menu closed
    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.isMenuOpen).toBe(false);
  });

  it("should call isSelectedNewFolder and close the menu", () => {
    const mockIsSelectedNewFolder = vi.fn();
    const mockIsSelectedNewNote = vi.fn();

    const { result } = renderHook(() =>
      useFloatingButtonHandlers(mockIsSelectedNewFolder, mockIsSelectedNewNote)
    );

    act(() => {
      result.current.toggleMenu(); // Open menu
    });
    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.selectedOption("folder");
    });

    expect(mockIsSelectedNewFolder).toHaveBeenCalledTimes(1);
    expect(mockIsSelectedNewNote).not.toHaveBeenCalled();
    expect(result.current.isMenuOpen).toBe(false); // Menu should close
  });

  it("should call isSelectedNewNote and close the menu", () => {
    const mockIsSelectedNewFolder = vi.fn();
    const mockIsSelectedNewNote = vi.fn();

    const { result } = renderHook(() =>
      useFloatingButtonHandlers(mockIsSelectedNewFolder, mockIsSelectedNewNote)
    );

    act(() => {
      result.current.toggleMenu(); // Open menu
    });
    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.selectedOption("note");
    });

    expect(mockIsSelectedNewNote).toHaveBeenCalledTimes(1);
    expect(mockIsSelectedNewFolder).not.toHaveBeenCalled();
    expect(result.current.isMenuOpen).toBe(false); // Menu should close
  });
});
