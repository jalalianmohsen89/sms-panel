import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "@/core/components/base/button";
import { SearchOutlined } from "@ant-design/icons";

describe("Button Component", () => {
  it("renders different button types", () => {
    const { container } = render(
      <>
        <Button type="primary">Primary</Button>
        <Button type="default">Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </>,
    );

    expect(container.querySelector(".ant-btn-primary")).toBeInTheDocument();
    expect(container.querySelector(".ant-btn-default")).toBeInTheDocument();
    expect(container.querySelector(".ant-btn-dashed")).toBeInTheDocument();
    expect(container.querySelector(".ant-btn-link")).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const { container } = render(
      <>
        <Button size="small">Small</Button>
        <Button>Default</Button>
        <Button size="large">Large</Button>
      </>,
    );

    expect(container.querySelector(".ant-btn-sm")).toBeInTheDocument();
    expect(container.querySelector(".ant-btn")).toBeInTheDocument();
    expect(container.querySelector(".ant-btn-lg")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const { container } = render(
      <Button icon={<SearchOutlined />}>Search</Button>,
    );

    expect(container.querySelector(".anticon-search")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    const button = container.querySelector(".ant-btn");

    fireEvent.click(button!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders in block mode", () => {
    const { container } = render(<Button block>Block Button</Button>);

    expect(container.querySelector(".ant-btn-block")).toBeInTheDocument();
  });

  it("renders in danger mode", () => {
    const { container } = render(<Button danger>Danger Button</Button>);

    expect(container.querySelector(".ant-btn-dangerous")).toBeInTheDocument();
  });

  it("respects htmlType attribute", () => {
    const { container } = render(<Button htmlType="submit">Submit</Button>);
    const button = container.querySelector("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <Button className="custom-button">Custom</Button>,
    );

    expect(container.querySelector(".custom-button")).toBeInTheDocument();
  });
});
