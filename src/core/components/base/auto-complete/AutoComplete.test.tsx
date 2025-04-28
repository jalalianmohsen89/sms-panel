import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AutoComplete } from "@/core/components/base/auto-complete";

describe("AutoComplete Component", () => {
  it("renders with options", async() => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(<AutoComplete options={options} data-testid="auto-complete" />);
    expect(screen.getByTestId("auto-complete")).toBeDefined();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(
      <AutoComplete size="large" data-testid="auto-complete" />,
    );
    const component = screen.getByTestId("auto-complete");

    expect(component.getAttribute("class")).contains("ant-select-lg");

    rerender(<AutoComplete size="small" data-testid="auto-complete" />);
    expect(component.getAttribute("class")).contains("ant-select-sm");
  });

  it("renders with children", () => {
    render(
      <AutoComplete data-testid="auto-complete">
        <input data-testid="child-input" />
      </AutoComplete>,
    );
    expect(screen.getByTestId("child-input")).toBeDefined();
    expect(screen.getByTestId("auto-complete")).toBeDefined();
  });
});
