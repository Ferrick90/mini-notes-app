import { renderHook, act } from "@testing-library/react";
import { useNavbarHandlers } from "./useNavbarHandlers";
import { describe, it, expect } from "vitest";

describe("useNavbarHandlers", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNavbarHandlers());

    expect(result.current.searchText).toBe("");
    expect(result.current.isSearchOpen).toBe(false);
  });

  it("should update searchText when setSearchText is called", () => {
    const { result } = renderHook(() => useNavbarHandlers());

    act(() => {
      result.current.setSearchText("New search text");
    });

    expect(result.current.searchText).toBe("New search text");
  });

  it("should toggle isSearchOpen when toggleSearch is called", () => {
    const { result } = renderHook(() => useNavbarHandlers());

    // Initially, search is closed
    expect(result.current.isSearchOpen).toBe(false);

    // Toggle open
    act(() => {
      result.current.toggleSearch();
    });

    expect(result.current.isSearchOpen).toBe(true);

    // Toggle back to closed
    act(() => {
      result.current.toggleSearch();
    });

    expect(result.current.isSearchOpen).toBe(false);
  });

  it("should allow direct setting of isSearchOpen with setIsSearchOpen", () => {
    const { result } = renderHook(() => useNavbarHandlers());

    act(() => {
      result.current.setIsSearchOpen(true);
    });

    expect(result.current.isSearchOpen).toBe(true);

    act(() => {
      result.current.setIsSearchOpen(false);
    });

    expect(result.current.isSearchOpen).toBe(false);
  });
});
