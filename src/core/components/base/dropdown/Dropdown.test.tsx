import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { Dropdown } from "./index";

// Mock matchMedia for antd
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

describe("Dropdown Component", () => {
  const menuItems = {
    items: [
      { key: "1", label: "Item 1" },
      { key: "2", label: "Item 2" }
    ]
  };

  it("renders basic dropdown", () => {
    const { baseElement } = render(
      <Dropdown menu={menuItems}>
        <a>Click me</a>
      </Dropdown>
    );

    const trigger = baseElement.querySelector("a");

    expect(trigger).toBeInTheDocument();
  });

  it("handles click trigger", async() => {
    const onOpenChange = vi.fn();
    const { baseElement } = render(
      <Dropdown
        menu={menuItems}
        trigger={["click"]}
        onOpenChange={onOpenChange}
      >
        <a>Click me</a>
      </Dropdown>
    );

    const trigger = baseElement.querySelector("a");

    expect(trigger).toBeInTheDocument();

    await act(async() => {
      fireEvent.click(trigger!);
    });

    expect(onOpenChange).toHaveBeenCalled();
  });

  it("renders with custom placement", () => {
    const { baseElement } = render(
      <Dropdown menu={menuItems} placement="bottomRight">
        <a>Click me</a>
      </Dropdown>
    );

    const trigger = baseElement.querySelector("a");

    expect(trigger).toBeInTheDocument();
  });
});
