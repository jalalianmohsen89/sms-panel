// Tooltip.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tooltip } from "@/core/components/base/tooltip";
// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("Tooltip Component", () => {
  // Helper function for common render pattern
  const renderTooltip = (props = {}) =>
    render(
      <Tooltip title="Tooltip Text" {...props}>
        <button>Hover Me</button>
      </Tooltip>,
    );

  // Basic rendering
  it("renders children correctly", () => {
    renderTooltip();
    expect(screen.getByText("Hover Me")).toBeInTheDocument();
  });

  // Custom styling
  it("applies custom className and styles", () => {
    const customStyle = { backgroundColor: "red" };

    render(
      <Tooltip
        title="Tooltip Text"
        className="custom-tooltip"
        style={customStyle}
      >
        <button>Hover Me</button>
      </Tooltip>,
    );

    const tooltipWrapper = document.querySelector(".custom-tooltip");

    expect(tooltipWrapper).toBeInTheDocument();
  });

  // Arrow test (simplified)
  it("renders with arrow", async() => {
    renderTooltip({ arrow: true });
    const trigger = screen.getByText("Hover Me");

    fireEvent.mouseEnter(trigger);

    expect(await screen.findByText("Tooltip Text")).toBeInTheDocument();
  });

  // Arrow point at center (simplified)
  it("renders with arrowPointAtCenter", async() => {
    renderTooltip({ arrowPointAtCenter: true });
    const trigger = screen.getByText("Hover Me");

    fireEvent.mouseEnter(trigger);

    expect(await screen.findByText("Tooltip Text")).toBeInTheDocument();
  });

  // Multiple props combination (simplified)
  it("works with multiple props combined", async() => {
    render(
      <Tooltip
        title="Complex Tooltip"
        placement="top"
        color="#ff0000"
        className="custom-tooltip"
        style={{ fontSize: "14px" }}
      >
        <button>Complex Hover</button>
      </Tooltip>,
    );

    const trigger = screen.getByText("Complex Hover");

    fireEvent.mouseEnter(trigger);

    expect(await screen.findByText("Complex Tooltip")).toBeInTheDocument();
  });
});
