import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Alert } from "@/core/components/base";

describe("Alert Component", () => {
  it("renders with message", () => {
    render(<Alert message="Test message" />);
    expect(screen.getByText("Test message")).toBeDefined();
  });

  it("renders with description", () => {
    render(<Alert message="Title" description="Test description" />);
    expect(screen.getByText("Test description")).toBeDefined();
  });

  it("handles onClose callback", () => {
    const onClose = vi.fn();

    render(
      <Alert message="Test" closable onClose={onClose} data-testid="alert" />,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("renders with different types", () => {
    const { rerender } = render(
      <Alert message="Test" type="success" data-testid="alert" />,
    );

    const alert = screen.getByTestId("alert");

    expect(alert.getAttribute("class")).contains("ant-alert-success");

    rerender(<Alert message="Test" type="error" data-testid="alert" />);
    expect(alert.getAttribute("class")).contains("ant-alert-error");
  });

  it("shows icon when showIcon is true", () => {
    render(
      <Alert
        message="Test"
        showIcon
        type="success"
        data-testid="alert-with-icon"
      />,
    );

    const alert = screen.getByTestId("alert-with-icon");
    const icon = alert.querySelector(".anticon");

    expect(icon).not.toBeNull();
  });
});
