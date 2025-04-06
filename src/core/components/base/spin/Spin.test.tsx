import React from "react";
import { render } from "@testing-library/react";
import { Spin } from "./index";

// Mock antd spin component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Spin: ({
    spinning = true,
    size = "default",
    delay,
    className,
    style,
    children,
    indicator,
    tip
  }: {
    spinning?: boolean;
    size?: "small" | "default" | "large";
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    indicator?: React.ReactNode;
    tip?: React.ReactNode;
  }) => (
    <div
      className={`ant-spin ant-spin-${size} ${spinning ? "ant-spin-spinning" : ""} ${
        className || ""
      }`}
      style={style}
      data-testid="spin"
      data-spinning={spinning}
      data-delay={delay}
    >
      {indicator && <div data-testid="custom-indicator">{indicator}</div>}
      {tip && <div className="ant-spin-tip">{tip}</div>}
      {children && (
        <div
          className={`ant-spin-container ${spinning ? "ant-spin-blur" : ""}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}));

describe("Spin Component", () => {
  it("renders basic spinner", () => {
    const { getByTestId } = render(<Spin />);

    expect(getByTestId("spin")).toHaveClass("ant-spin", "ant-spin-spinning");
  });

  it("applies different sizes", () => {
    const { getByTestId } = render(<Spin size="large" />);

    expect(getByTestId("spin")).toHaveClass("ant-spin-large");
  });

  it("handles spinning state", () => {
    const { getByTestId } = render(<Spin spinning={false} />);

    expect(getByTestId("spin")).not.toHaveClass("ant-spin-spinning");
  });

  it("renders with delay", () => {
    const { getByTestId } = render(<Spin delay={500} />);

    expect(getByTestId("spin")).toHaveAttribute("data-delay", "500");
  });

  it("renders custom indicator", () => {
    const { getByTestId } = render(
      <Spin indicator={<div>Custom Spinner</div>} />
    );

    expect(getByTestId("custom-indicator")).toHaveTextContent("Custom Spinner");
  });

  it("shows tip text", () => {
    const { getByText } = render(<Spin tip="Loading..." />);

    expect(getByText("Loading...")).toHaveClass("ant-spin-tip");
  });

  it("wraps children content", () => {
    const { container } = render(
      <Spin>
        <div>Content</div>
      </Spin>
    );

    expect(container.querySelector(".ant-spin-container")).toBeInTheDocument();
  });

  it("applies blur effect on children when spinning", () => {
    const { container } = render(
      <Spin spinning>
        <div>Content</div>
      </Spin>
    );

    expect(container.querySelector(".ant-spin-blur")).toBeInTheDocument();
  });

  it("applies custom styling", () => {
    const { getByTestId } = render(
      <Spin className="custom-spin" style={{ margin: "20px" }} />
    );
    const spin = getByTestId("spin");

    expect(spin).toHaveClass("custom-spin");
    expect(spin).toHaveStyle({ margin: "20px" });
  });
});
