import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Col } from "./index";

describe("Col Component", () => {
  it("renders with basic span", () => {
    const { container } = render(<Col span={12}>Content</Col>);

    expect(container.querySelector(".ant-col-12")).toBeInTheDocument();
  });

  it("renders with responsive props", () => {
    const { container } = render(
      <Col xs={24} sm={12} md={8} lg={6}>
        Content
      </Col>,
    );

    expect(container.querySelector(".ant-col-xs-24")).toBeInTheDocument();
    expect(container.querySelector(".ant-col-sm-12")).toBeInTheDocument();
    expect(container.querySelector(".ant-col-md-8")).toBeInTheDocument();
    expect(container.querySelector(".ant-col-lg-6")).toBeInTheDocument();
  });

  it("renders with offset", () => {
    const { container } = render(
      <Col span={12} offset={6}>
        Content
      </Col>,
    );

    expect(container.querySelector(".ant-col-offset-6")).toBeInTheDocument();
  });

  it("renders with order", () => {
    const { container } = render(
      <Col span={6} order={1}>
        Content
      </Col>,
    );

    expect(container.querySelector(".ant-col-order-1")).toBeInTheDocument();
  });

  it("renders with push and pull", () => {
    const { container } = render(
      <Col span={6} push={2} pull={2}>
        Content
      </Col>,
    );

    expect(container.querySelector(".ant-col-push-2")).toBeInTheDocument();
    expect(container.querySelector(".ant-col-pull-2")).toBeInTheDocument();
  });

  it("renders with flex", () => {
    const { container } = render(<Col flex="1">Content</Col>);
    const colElement = container.firstChild as HTMLElement;

    expect(colElement).toHaveStyle({ flex: "1" });
  });
});
