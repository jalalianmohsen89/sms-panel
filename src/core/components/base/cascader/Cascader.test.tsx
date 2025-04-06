import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Cascader } from "./index";

describe("Cascader Component", () => {
  const mockOptions = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou"
        }
      ]
    }
  ];

  it("renders basic cascader", () => {
    const { container } = render(<Cascader options={mockOptions} />);

    expect(container.querySelector(".ant-cascader")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { container } = render(
      <>
        <Cascader options={mockOptions} size="small" />
        <Cascader options={mockOptions} size="middle" />
        <Cascader options={mockOptions} size="large" />
      </>
    );

    expect(container.querySelector(".ant-select-lg")).toBeInTheDocument();
    expect(container.querySelector(".ant-select-sm")).toBeInTheDocument();
  });

  it("renders in disabled state", () => {
    const { container } = render(<Cascader options={mockOptions} disabled />);

    expect(container.querySelector(".ant-select-disabled")).toBeInTheDocument();
  });

  it("renders without border", () => {
    const { container } = render(
      <Cascader options={mockOptions} bordered={false} />
    );

    expect(
      container.querySelector(".ant-select-borderless")
    ).toBeInTheDocument();
  });

  it("renders with default value", () => {
    const { container } = render(
      <Cascader
        options={mockOptions}
        defaultValue={["zhejiang", "hangzhou"]}
      />
    );

    expect(container.querySelector(".ant-cascader")).toHaveTextContent(
      "Hangzhou"
    );
  });

  it("renders in multiple selection mode", () => {
    const { container } = render(<Cascader options={mockOptions} multiple />);

    expect(container.querySelector(".ant-select-multiple")).toBeInTheDocument();
  });

  it("shows/hides arrow", () => {
    const { container } = render(
      <Cascader options={mockOptions} showArrow={false} />
    );

    expect(
      container.querySelector(".ant-cascader-arrow")
    ).not.toBeInTheDocument();
  });
});
