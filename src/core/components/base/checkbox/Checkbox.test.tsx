import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "@/core/components/base/checkbox";

describe("Checkbox Component", () => {
  it("renders basic checkbox", () => {
    const { container } = render(<Checkbox>Test Checkbox</Checkbox>);

    expect(container.querySelector(".ant-checkbox")).toBeInTheDocument();
    expect(container.querySelector(".ant-checkbox-wrapper")).toHaveTextContent(
      "Test Checkbox",
    );
  });

  it("handles checked state", () => {
    const { container } = render(<Checkbox defaultChecked>Checked</Checkbox>);

    expect(
      container.querySelector(".ant-checkbox-checked"),
    ).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Checkbox onChange={handleChange}>Click me</Checkbox>,
    );

    const checkbox = container.querySelector("input[type='checkbox']");

    fireEvent.click(checkbox!);
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders checkbox group", () => {
    const options = [
      { label: "Apple", value: "apple" },
      { label: "Pear", value: "pear" },
    ];

    const { container } = render(<Checkbox.Group options={options} />);

    expect(container.querySelectorAll(".ant-checkbox-wrapper")).toHaveLength(2);
  });

  it("renders in indeterminate state", () => {
    const { container } = render(<Checkbox indeterminate>Partial</Checkbox>);

    expect(
      container.querySelector(".ant-checkbox-indeterminate"),
    ).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    const { container } = render(<Checkbox disabled>Disabled</Checkbox>);

    expect(
      container.querySelector(".ant-checkbox-disabled"),
    ).toBeInTheDocument();
  });

  it("handles group onChange", () => {
    const handleChange = vi.fn();
    const options = ["Apple", "Pear"];

    const { container } = render(
      <Checkbox.Group options={options} onChange={handleChange} />,
    );

    const firstCheckbox = container.querySelector("input[type='checkbox']");

    fireEvent.click(firstCheckbox!);
    expect(handleChange).toHaveBeenCalledWith(["Apple"]);
  });
});
