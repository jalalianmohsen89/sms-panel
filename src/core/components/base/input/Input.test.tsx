import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./index";

describe("Input Component", () => {
  it("renders default input", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Enter text");
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();

    render(<Input placeholder="Type here" onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText("Type here");

    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(handleChange).toHaveBeenCalled();
    expect(inputElement).toHaveValue("New Value");
  });

  it("handles onPressEnter event", () => {
    const handlePressEnter = vi.fn();

    render(<Input placeholder="Press Enter" onPressEnter={handlePressEnter} />);
    const inputElement = screen.getByPlaceholderText("Press Enter");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(handlePressEnter).toHaveBeenCalled();
  });

  it("renders Search input", () => {
    render(<Input.Search placeholder="Search here" />);
    const searchElement = screen.getByPlaceholderText("Search here");

    expect(searchElement).toBeInTheDocument();
  });

  it("renders Password input", () => {
    render(<Input.Password placeholder="Enter password" />);
    const passwordElement = screen.getByPlaceholderText("Enter password");

    expect(passwordElement).toBeInTheDocument();
  });

  it("renders OTP input", () => {
    render(<Input.OTP />);
    const otpElement = screen.getByPlaceholderText("Enter OTP");

    expect(otpElement).toBeInTheDocument();
  });

  it("applies custom styles", () => {
    const { container } = render(<Input placeholder="Custom style" />);

    // انتخاب عنصر input
    const inputElement = container.querySelector("input");

    expect(inputElement).toBeInTheDocument();

    // دریافت استایل محاسبه‌شده
    const computedStyle = window.getComputedStyle(inputElement!);

    // بررسی رنگ با مقدار RGB (قرمز)
    expect(computedStyle.color).toBe("rgb(255, 0, 0)");
  });
});
