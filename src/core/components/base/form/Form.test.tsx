import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Form } from "./index";

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
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Form Component", () => {
  it("renders basic form", () => {
    const { baseElement } = render(
      <Form>
        <Form.Item>
          <input placeholder="test input" />
        </Form.Item>
      </Form>,
    );

    const form = baseElement.querySelector(".ant-form");

    expect(form).toBeInTheDocument();
  });

  it("renders with different layouts", () => {
    const { baseElement } = render(
      <Form layout="vertical">
        <Form.Item label="Test">
          <input placeholder="test input" />
        </Form.Item>
      </Form>,
    );

    const form = baseElement.querySelector(".ant-form-vertical");

    expect(form).toBeInTheDocument();
  });

  it("renders Form.Item with label", () => {
    const { baseElement } = render(
      <Form>
        <Form.Item label="Username">
          <input placeholder="username" />
        </Form.Item>
      </Form>,
    );

    const label = baseElement.querySelector(".ant-form-item-label");

    expect(label).toHaveTextContent("Username");
  });

  it("handles form values change", () => {
    const onValuesChange = vi.fn();
    const { baseElement } = render(
      <Form onValuesChange={onValuesChange}>
        <Form.Item name="username">
          <input />
        </Form.Item>
      </Form>,
    );

    const input = baseElement.querySelector("input");

    fireEvent.change(input!, { target: { value: "test" } });

    expect(onValuesChange).toHaveBeenCalled();
  });
});
