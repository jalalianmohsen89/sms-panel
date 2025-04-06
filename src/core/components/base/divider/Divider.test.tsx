import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "./index";

describe("Divider Component", () => {
  it("renders basic divider", () => {
    const { container } = render(<Divider />);

    expect(container.querySelector(".ant-divider")).toBeInTheDocument();
  });

  it("renders with different orientations", () => {
    const { container } = render(
      <Divider orientation="left">Left Text</Divider>
    );

    expect(
      container.querySelector(".ant-divider-with-text-left")
    ).toBeInTheDocument();
  });

  it("renders with text content", () => {
    const { container } = render(<Divider>Text Content</Divider>);

    expect(
      container.querySelector(".ant-divider-with-text")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".ant-divider-inner-text")
    ).toHaveTextContent("Text Content");
  });

  it("renders dashed divider", () => {
    const { container } = render(<Divider dashed />);

    expect(container.querySelector(".ant-divider-dashed")).toBeInTheDocument();
  });

  it("renders plain divider", () => {
    const { container } = render(<Divider plain>Plain Text</Divider>);

    expect(container.querySelector(".ant-divider-plain")).toBeInTheDocument();
  });

  it("renders vertical divider", () => {
    const { container } = render(<Divider type="vertical" />);

    expect(
      container.querySelector(".ant-divider-vertical")
    ).toBeInTheDocument();
  });
});
