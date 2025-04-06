import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Drawer } from "./index";

// Mock matchMedia
beforeAll(() => {
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
      dispatchEvent: vi.fn()
    }))
  });
});

describe("Drawer Component", () => {
  it("renders basic drawer", () => {
    const { baseElement } = render(
      <Drawer open title="Test Drawer">
        Content
      </Drawer>
    );

    const drawer = baseElement.querySelector(".ant-drawer");
    const title = baseElement.querySelector(".ant-drawer-title");

    expect(drawer).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Drawer");
  });

  it("handles onClose event", () => {
    const onClose = vi.fn();
    const { baseElement } = render(
      <Drawer open onClose={onClose}>
        Content
      </Drawer>
    );

    const closeButton = baseElement.querySelector(".ant-drawer-close");

    fireEvent.click(closeButton!);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders with different placements", () => {
    const { baseElement } = render(
      <Drawer open placement="right">
        Content
      </Drawer>
    );

    expect(baseElement.querySelector(".ant-drawer-right")).toBeInTheDocument();
  });

  it("renders with custom width", () => {
    const { baseElement } = render(
      <Drawer open width={500}>
        Content
      </Drawer>
    );

    const drawer = baseElement.querySelector(".ant-drawer-content-wrapper");

    expect(drawer).toHaveStyle({ width: "500px" });
  });

  it("handles afterOpenChange callback", () => {
    const afterOpenChange = vi.fn();

    render(
      <Drawer open afterOpenChange={afterOpenChange}>
        Content
      </Drawer>
    );
    expect(afterOpenChange).toHaveBeenCalledWith(true);
  });

  it("handles destroyOnClose", () => {
    const { container, rerender } = render(
      <Drawer open destroyOnClose>
        Content
      </Drawer>
    );

    rerender(
      <Drawer open={false} destroyOnClose>
        Content
      </Drawer>
    );
    expect(
      container.querySelector(".ant-drawer-content")
    ).not.toBeInTheDocument();
  });
});
