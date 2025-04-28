import React from "react";
import { render } from "@testing-library/react";
import { Space } from "@/core/components/base/space";

// Mock antd space component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Space: ({
    children,
    direction = "horizontal",
    size,
    align,
    split,
    wrap,
    className,
    style,
    onClick,
  }: {
    children?: React.ReactNode;
    direction?: "vertical" | "horizontal";
    size?: "small" | "middle" | "large" | number;
    align?: "start" | "end" | "center" | "baseline";
    split?: React.ReactNode;
    wrap?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  }) => (
    <div
      className={`ant-space ant-space-${direction} ${className || ""}`}
      style={style}
      onClick={onClick}
      data-testid="space"
      data-size={size}
      data-align={align}
      data-wrap={wrap}
    >
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          <div className="ant-space-item">{child}</div>
          {split && index < React.Children.count(children) - 1 && (
            <div className="ant-space-split">{split}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  ),
}));

describe("Space Component", () => {
  it("renders basic space", () => {
    const { getByTestId } = render(<Space />);

    expect(getByTestId("space")).toHaveClass("ant-space");
  });

  it("renders with specified direction", () => {
    const { getByTestId } = render(<Space direction="vertical" />);

    expect(getByTestId("space")).toHaveClass("ant-space-vertical");
  });

  it("applies size correctly", () => {
    const { getByTestId } = render(<Space size="large" />);

    expect(getByTestId("space")).toHaveAttribute("data-size", "large");
  });

  it("applies numeric size", () => {
    const { getByTestId } = render(<Space size={24} />);

    expect(getByTestId("space")).toHaveAttribute("data-size", "24");
  });

  it("handles alignment", () => {
    const { getByTestId } = render(<Space align="center" />);

    expect(getByTestId("space")).toHaveAttribute("data-align", "center");
  });

  it("renders with split", () => {
    const { container } = render(
      <Space split="|">
        <div>Item 1</div>
        <div>Item 2</div>
      </Space>,
    );

    expect(container.querySelector(".ant-space-split")).toHaveTextContent("|");
  });

  it("handles wrap property", () => {
    const { getByTestId } = render(<Space wrap />);

    expect(getByTestId("space")).toHaveAttribute("data-wrap", "true");
  });

  it("renders children correctly", () => {
    const { getAllByText } = render(
      <Space>
        <div>Item 1</div>
        <div>Item 2</div>
      </Space>,
    );
    const items = getAllByText(/Item/);

    expect(items).toHaveLength(2);
  });

  it("applies custom styling", () => {
    const { getByTestId } = render(
      <Space className="custom-space" style={{ margin: "10px" }} />,
    );
    const space = getByTestId("space");

    expect(space).toHaveClass("custom-space");
    expect(space).toHaveStyle({ margin: "10px" });
  });

  it("handles onClick event", () => {
    const handleClick = vi.fn();
    const { getByTestId } = render(<Space onClick={handleClick} />);

    getByTestId("space").click();
    expect(handleClick).toHaveBeenCalled();
  });
});
