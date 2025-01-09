import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useNoteModalHandlers } from "./useNoteModalHandlers";

describe("useNoteModalHandlers", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNoteModalHandlers());

    expect(result.current.name).toBe("");
    expect(result.current.details).toBe("");
    expect(result.current.showError).toBe(false);
  });

  it("should update the name state when setName is called", () => {
    const { result } = renderHook(() => useNoteModalHandlers());

    act(() => {
      result.current.setName("Test Note");
    });

    expect(result.current.name).toBe("Test Note");
  });

  it("should update the details state when setDetails is called", () => {
    const { result } = renderHook(() => useNoteModalHandlers());

    act(() => {
      result.current.setDetails("Note Details");
    });

    expect(result.current.details).toBe("Note Details");
  });

  it("should set showError to true if inputs are invalid", () => {
    const { result } = renderHook(() => useNoteModalHandlers());

    act(() => {
      const isValid = result.current.validateInputs();
      expect(isValid).toBe(false);
    });

    expect(result.current.showError).toBe(true);
  });

  it("should set showError to false if inputs are valid", async () => {
    const { result } = renderHook(() => useNoteModalHandlers());

    act(() => {
      result.current.setName("Valid Note");
      result.current.setDetails("Valid Details");
    });

    await act(async () => {
      // Now validate inputs after state updates are complete
      const isValid = result.current.validateInputs();
      expect(isValid).toBe(true);
    });

    expect(result.current.showError).toBe(false);
  });

  it("should reset all state values when resetModal is called", () => {
    const { result } = renderHook(() => useNoteModalHandlers());

    act(() => {
      result.current.setName("Test Note");
      result.current.setDetails("Test Details");
      result.current.setShowError(false);

      result.current.resetModal();
    });

    expect(result.current.name).toBe("");
    expect(result.current.details).toBe("");
    expect(result.current.showError).toBe(false);
  });
});
