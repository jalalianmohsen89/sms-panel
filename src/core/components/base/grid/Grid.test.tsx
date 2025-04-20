import { describe, it, expect, vi, beforeAll } from "vitest";
import { renderHook } from "@testing-library/react";
import { Grid } from "./index";

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query.includes("min-width: 768px"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Grid Component", () => {
  it("should export Grid component", () => {
    expect(Grid).toBeDefined();
  });

  it("should export useBreakpoint hook", () => {
    expect(Grid.useBreakpoint).toBeDefined();
  });

  it("should detect breakpoints correctly", () => {
    const { result } = renderHook(() => Grid.useBreakpoint());

    expect(result.current).toEqual(
      expect.objectContaining({
        xs: expect.any(Boolean),
        sm: expect.any(Boolean),
        md: expect.any(Boolean),
        lg: expect.any(Boolean),
        xl: expect.any(Boolean),
        xxl: expect.any(Boolean),
      }),
    );
  });

  it("should handle md breakpoint", () => {
    const { result } = renderHook(() => Grid.useBreakpoint());

    expect(result.current.md).toBe(true);
  });
});
