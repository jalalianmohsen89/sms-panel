import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Select } from "./index";

// Mock antd select component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Select: ({
    value,
    defaultValue,
    mode,
    options = [],
    onChange,
    placeholder,
    status,
    style,
    className
  }: {
    value?: string | string[];
    defaultValue?: string | string[];
    mode?: "multiple" | "tags";
    options?: Array<{ label: string; value: string }>;
    onChange?: (value: any) => void;
    placeholder?: string;
    status?: "error" | "warning";
    style?: React.CSSProperties;
    className?: string;
  }) => (
    <select
      className={`ant-select ${status ? `ant-select-${status}` : ""} ${
        className || ""
      }`}
      value={value}
      defaultValue={defaultValue}
      multiple={mode === "multiple" || mode === "tags"}
      onChange={(e) => onChange?.(e.target.value)}
      style={style}
      data-testid="select"
      data-mode={mode}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}));

describe("Select Component", () => {
  const defaultOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ];

  it("renders basic select", () => {
    const { getByTestId } = render(<Select options={defaultOptions} />);

    expect(getByTestId("select")).toHaveClass("ant-select");
  });

  it("handles value change", () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <Select options={defaultOptions} onChange={handleChange} />
    );

    fireEvent.change(getByTestId("select"), { target: { value: "1" } });
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  it("renders in multiple mode", () => {
    const { getByTestId } = render(
      <Select mode="multiple" options={defaultOptions} />
    );

    expect(getByTestId("select")).toHaveAttribute("multiple");
    expect(getByTestId("select")).toHaveAttribute("data-mode", "multiple");
  });

  it("shows placeholder", () => {
    const placeholder = "Select an option";
    const { getByText } = render(
      <Select options={defaultOptions} placeholder={placeholder} />
    );

    expect(getByText(placeholder)).toBeInTheDocument();
  });

  it("applies error status", () => {
    const { getByTestId } = render(
      <Select options={defaultOptions} status="error" />
    );

    expect(getByTestId("select")).toHaveClass("ant-select-error");
  });

  it("displays default value", () => {
    const { getByTestId } = render(
      <Select options={defaultOptions} defaultValue="1" />
    );

    expect(getByTestId("select")).toHaveValue("1");
  });

  it("applies custom styling", () => {
    const { getByTestId } = render(
      <Select
        options={defaultOptions}
        style={{ width: "200px" }}
        className="custom-select"
      />
    );
    const select = getByTestId("select");

    expect(select).toHaveStyle({ width: "200px" });
  });

  it("handles dropdownMatchSelectWidth prop", () => {
    const { getByTestId } = render(
      <Select options={defaultOptions} dropdownMatchSelectWidth={false} />
    );

    expect(getByTestId("select")).toBeInTheDocument();
  });
});
