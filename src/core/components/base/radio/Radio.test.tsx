import React from "react";
import { render } from "@testing-library/react";
import { Radio } from "@/core/components/base/radio";

// Mock antd radio components
vi.mock("antd", () => {
  const RadioButton = (props: any) => (
    <input
      type="radio"
      data-testid="radio-button"
      className="ant-radio-button-input"
      {...props}
    />
  );

  const RadioGroup = ({
    children,
    size,
    disabled,
    optionType,
    buttonStyle,
    className,
  }: {
    children?: React.ReactNode;
    size?: "large" | "middle" | "small";
    disabled?: boolean;
    optionType?: "default" | "button";
    buttonStyle?: "outline" | "solid";
    className?: string;
  }) => (
    <div
      className={`ant-radio-group ${className || ""}`}
      data-testid="radio-group"
      data-size={size}
      data-disabled={disabled}
      data-option-type={optionType}
      data-button-style={buttonStyle}
    >
      {children}
    </div>
  );

  const Radio = ({
    children,
    value,
    disabled,
    checked,
    onChange,
    id,
    className,
  }: {
    children?: React.ReactNode;
    value?: string | number;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (e: any) => void;
    id?: string;
    className?: string;
  }) => (
    <label className={`ant-radio-wrapper ${className || ""}`}>
      <input
        type="radio"
        data-testid="radio"
        className="ant-radio-input"
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={(e) => onChange?.({ target: { value: e.target.value } })}
        id={id}
      />
      <span>{children}</span>
    </label>
  );

  Radio.Group = RadioGroup;
  Radio.Button = RadioButton;

  return { Radio };
});

describe("Radio Component", () => {
  it("renders basic radio", () => {
    const { getByTestId } = render(<Radio>Option</Radio>);

    expect(getByTestId("radio")).toHaveClass("ant-radio-input");
  });

  it("respects disabled state", () => {
    const { getByTestId } = render(<Radio disabled>Option</Radio>);

    expect(getByTestId("radio")).toBeDisabled();
  });

  it("renders radio group", () => {
    const { getByTestId } = render(
      <Radio.Group>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </Radio.Group>,
    );

    expect(getByTestId("radio-group")).toHaveClass("ant-radio-group");
  });

  it("applies size to radio group", () => {
    const { getByTestId } = render(<Radio.Group size="large" />);

    expect(getByTestId("radio-group")).toHaveAttribute("data-size", "large");
  });

  it("applies button style", () => {
    const { getByTestId } = render(
      <Radio.Group optionType="button" buttonStyle="solid" />,
    );

    expect(getByTestId("radio-group")).toHaveAttribute(
      "data-button-style",
      "solid",
    );
    expect(getByTestId("radio-group")).toHaveAttribute(
      "data-option-type",
      "button",
    );
  });

  it("handles block display", () => {
    const { container } = render(
      <Radio.Group className="ant-radio-group-block" />,
    );

    expect(container.firstChild).toHaveClass("ant-radio-group-block");
  });
});
