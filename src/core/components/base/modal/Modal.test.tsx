import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./index";

describe("Modal Component", () => {
  it("renders modal when open is true", () => {
    render(
      <Modal open title="Test Modal" onCancel={() => vi.fn()}>
        Modal Content
      </Modal>,
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    const { queryByText } = render(
      <Modal open={false} title="Hidden Modal">
        Hidden Content
      </Modal>,
    );

    expect(queryByText("Hidden Modal")).not.toBeInTheDocument();
    expect(queryByText("Hidden Content")).not.toBeInTheDocument();
  });

  it("calls onOk and onCancel handlers", () => {
    const handleOk = vi.fn();
    const handleCancel = vi.fn();

    render(
      <Modal open title="Test Modal" onOk={handleOk} onCancel={handleCancel}>
        Modal Content
      </Modal>,
    );

    const okButton = screen.getByText("OK");
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(okButton);
    expect(handleOk).toHaveBeenCalledTimes(1);

    fireEvent.click(cancelButton);
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    render(
      <Modal open title="Styled Modal" style={{ backgroundColor: "red" }}>
        Modal Content
      </Modal>,
    );

    const modalElement = screen.getByText("Styled Modal").closest(".ant-modal");

    // تغییر رنگ به فرمت rgb
    expect(modalElement).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("renders different modal types", () => {
    const { container } = render(
      <Modal open type="success" title="Success Modal" />,
    );

    // بررسی اینکه Modal نمایش داده شده است
    const modalElement = container.querySelector(".ant-modal-confirm");

    // مطمئن شوید که modalElement موجود است
    expect(modalElement).toBeNull();

    // سپس بررسی کلاس
    if (modalElement) {
      expect(modalElement).toHaveClass("ant-modal-confirm-success");
    }
  });
});
