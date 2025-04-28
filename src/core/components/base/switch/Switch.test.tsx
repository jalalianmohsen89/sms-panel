import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Switch } from "@/core/components/base/switch";

// Mock antd switch component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Switch: ({
    checked,
    defaultChecked,
    disabled,
    loading,
    size,
    onChange,
    className,
    style,
    checkedChildren,
    unCheckedChildren,
  }: {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: "small" | "default";
    onChange?: (checked: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
  }) => (
    <button
      role="switch"
      aria-checked={checked || defaultChecked || false}
      className={`ant-switch ${checked ? "ant-switch-checked" : ""} ${
        loading ? "ant-switch-loading" : ""
      } ${disabled ? "ant-switch-disabled" : ""} ${
        size === "small" ? "ant-switch-small" : ""
      } ${className || ""}`}
      style={style}
      disabled={disabled || loading}
      onClick={() => !disabled && !loading && onChange?.(!checked)}
      data-testid="switch"
    >
      <div className="ant-switch-handle" />
      <span className="ant-switch-inner">
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  ),
}));

describe("Switch Component", () => {
  it("renders basic switch", () => {
    const { getByRole } = render(<Switch />);

    expect(getByRole("switch")).toHaveClass("ant-switch");
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(<Switch onChange={handleChange} />);

    fireEvent.click(getByTestId("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled state", () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(<Switch disabled onChange={handleChange} />);

    fireEvent.click(getByTestId("switch"));
    expect(handleChange).not.toHaveBeenCalled();
    expect(getByTestId("switch")).toBeDisabled();
  });

  it("shows loading state", () => {
    const { getByTestId } = render(<Switch loading />);

    expect(getByTestId("switch")).toHaveClass("ant-switch-loading");
    expect(getByTestId("switch")).toBeDisabled();
  });

  it("applies small size", () => {
    const { getByTestId } = render(<Switch size="small" />);

    expect(getByTestId("switch")).toHaveClass("ant-switch-small");
  });

  it("displays checked state", () => {
    const { getByRole } = render(<Switch checked />);

    expect(getByRole("switch")).toHaveClass("ant-switch-checked");
    expect(getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("shows checked children", () => {
    const { getByText } = render(
      <Switch checked checkedChildren="ON" unCheckedChildren="OFF" />,
    );

    expect(getByText("ON")).toBeInTheDocument();
  });

  it("shows unchecked children", () => {
    const { getByText } = render(
      <Switch checked={false} checkedChildren="ON" unCheckedChildren="OFF" />,
    );

    expect(getByText("OFF")).toBeInTheDocument();
  });
});
