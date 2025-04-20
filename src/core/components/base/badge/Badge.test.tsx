import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge } from "./index";

describe("Badge Component", () => {
  it("renders with count", () => {
    const { container } = render(<Badge count={5} />);
    const badge = container.querySelector(".ant-badge-count");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("5");
  });

  it("renders with dot", () => {
    const { container } = render(<Badge dot />);
    const dot = container.querySelector(".ant-badge-dot");

    expect(dot).toBeInTheDocument();
  });

  it("renders with different status", () => {
    const { container } = render(
      <div>
        <Badge status="success" />
        <Badge status="error" />
        <Badge status="warning" />
      </div>,
    );

    expect(
      container.querySelector(".ant-badge-status-success"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".ant-badge-status-error"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".ant-badge-status-warning"),
    ).toBeInTheDocument();
  });

  it("renders with custom color", () => {
    const { container } = render(<Badge color="#f50" />);
    const badge = container.querySelector(".ant-badge-status-dot");

    expect(badge).toHaveStyle({ backgroundColor: "#f50" });
  });

  it("handles overflow count", () => {
    const { container } = render(<Badge count={100} overflowCount={99} />);
    const badge = container.querySelector(".ant-badge-count");

    expect(badge).toHaveTextContent("99+");
  });

  it("renders with children", () => {
    const { container } = render(
      <Badge count={5}>
        <div className="child-content">Content</div>
      </Badge>,
    );

    expect(container.querySelector(".child-content")).toBeInTheDocument();
    expect(container.querySelector(".ant-badge-count")).toHaveTextContent("5");
  });

  it("renders with zero when showZero is true", () => {
    const { container } = render(<Badge count={0} showZero />);
    const badge = container.querySelector(".ant-badge-count");

    expect(badge).toHaveTextContent("0");
  });
});
