import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Flex } from "./index";

describe("Flex Component", () => {
  it("renders basic flex container", () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>,
    );

    expect(container.querySelector(".ant-flex")).toBeInTheDocument();
  });

  it("renders with vertical direction", () => {
    const { container } = render(
      <Flex vertical>
        <div>Item 1</div>
      </Flex>,
    );

    expect(container.querySelector(".ant-flex-vertical")).toBeInTheDocument();
  });

  it("renders with justify content", () => {
    const { container } = render(
      <Flex justify="center">
        <div>Item 1</div>
      </Flex>,
    );

    expect(
      container.querySelector(".ant-flex-justify-center"),
    ).toBeInTheDocument();
  });

  it("renders with gap", () => {
    const { container } = render(
      <Flex gap={16}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>,
    );
    const flexElement = container.querySelector(".ant-flex");

    expect(flexElement).toHaveStyle({ gap: "16px" });
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Flex onClick={handleClick}>
        <div>Item 1</div>
      </Flex>,
    );

    const flexElement = container.querySelector(".ant-flex");

    fireEvent.click(flexElement!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders with align", () => {
    const { container } = render(
      <Flex align="center">
        <div>Item 1</div>
      </Flex>,
    );

    expect(
      container.querySelector(".ant-flex-align-center"),
    ).toBeInTheDocument();
  });
});
