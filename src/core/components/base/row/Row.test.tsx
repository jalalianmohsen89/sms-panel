import React from "react";
import { render } from "@testing-library/react";
import { Row } from "./index";

// Mock antd row component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Row: ({
    children,
    gutter,
    align,
    justify,
    wrap,
    className
  }: {
    children?: React.ReactNode;
    gutter?: number | [number, number];
    align?: "top" | "middle" | "bottom";
    justify?: "start" | "end" | "center" | "space-around" | "space-between";
    wrap?: boolean;
    className?: string;
  }) => (
    <div
      className={`ant-row ${className || ""}`}
      data-gutter={JSON.stringify(gutter)}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap}
    >
      {children}
    </div>
  )
}));

describe("Row Component", () => {
  it("renders basic row", () => {
    const { container } = render(<Row />);

    expect(container.firstChild).toHaveClass("ant-row");
  });

  it("applies gutter correctly", () => {
    const { container } = render(<Row gutter={16} />);

    expect(container.firstChild).toHaveAttribute("data-gutter", "16");
  });

  it("applies array gutter correctly", () => {
    const { container } = render(<Row gutter={[16, 24]} />);

    expect(container.firstChild).toHaveAttribute("data-gutter", "[16,24]");
  });

  it("handles alignment prop", () => {
    const { container } = render(<Row align="middle" />);

    expect(container.firstChild).toHaveAttribute("data-align", "middle");
  });

  it("handles justify prop", () => {
    const { container } = render(<Row justify="center" />);

    expect(container.firstChild).toHaveAttribute("data-justify", "center");
  });

  it("handles wrap prop", () => {
    const { container } = render(<Row wrap={false} />);

    expect(container.firstChild).toHaveAttribute("data-wrap", "false");
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <Row>
        <div>Test Content</div>
      </Row>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("combines multiple props correctly", () => {
    const { container } = render(
      <Row gutter={16} align="top" justify="center" wrap={false} />
    );

    expect(container.firstChild).toHaveAttribute("data-gutter", "16");
    expect(container.firstChild).toHaveAttribute("data-align", "top");
    expect(container.firstChild).toHaveAttribute("data-justify", "center");
    expect(container.firstChild).toHaveAttribute("data-wrap", "false");
  });
});
