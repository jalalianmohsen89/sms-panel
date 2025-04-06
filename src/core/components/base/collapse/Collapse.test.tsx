import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Collapse } from "./index";

describe("Collapse Component", () => {
  const mockItems = [
    {
      key: "1",
      label: "Panel 1",
      children: "Content 1"
    },
    {
      key: "2",
      label: "Panel 2",
      children: "Content 2"
    }
  ];

  it("renders basic collapse", () => {
    const { container } = render(<Collapse items={mockItems} />);

    expect(container.querySelector(".ant-collapse")).toBeInTheDocument();
    expect(container.querySelectorAll(".ant-collapse-item")).toHaveLength(2);
  });

  it("handles activeKey prop", () => {
    const { container } = render(<Collapse items={mockItems} activeKey="1" />);

    expect(
      container.querySelector(".ant-collapse-item-active")
    ).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Collapse items={mockItems} onChange={handleChange} />
    );

    const header = container.querySelector(".ant-collapse-header");

    fireEvent.click(header!);
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with ghost mode", () => {
    const { container } = render(<Collapse items={mockItems} ghost />);

    expect(container.querySelector(".ant-collapse-ghost")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { container } = render(<Collapse items={mockItems} size="small" />);

    expect(container.querySelector(".ant-collapse-small")).toBeInTheDocument();
  });

  it("renders with custom expandIcon", () => {
    const CustomIcon = () => <span className="custom-icon">+</span>;
    const { container } = render(
      <Collapse items={mockItems} expandIcon={CustomIcon} />
    );

    expect(container.querySelector(".custom-icon")).toBeInTheDocument();
  });

  it("renders with destroyInactivePanel", () => {
    const { container } = render(
      <Collapse items={mockItems} destroyInactivePanel />
    );
    const header = container.querySelector(".ant-collapse-header");

    fireEvent.click(header!);
    fireEvent.click(header!);
    expect(
      container.querySelector(".ant-collapse-content")
    ).not.toBeInTheDocument();
  });
});
