import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Upload } from "./index";

describe("Upload Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Upload />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("ant-upload-wrapper"); // به جای ant-upload
  });

  it("applies custom className", () => {
    const { container } = render(<Upload className="custom-upload" />);

    expect(container.firstChild).toHaveClass("custom-upload");
  });

  it("renders children inside upload button", () => {
    const { getByText } = render(<Upload>Click to Upload</Upload>);

    expect(getByText("Click to Upload")).toBeInTheDocument();
  });

  it("disables upload input when disabled prop is true", () => {
    const { container } = render(<Upload disabled />);
    const input = container.querySelector(
      "input[type='file']"
    ) as HTMLInputElement;

    expect(input).toBeDisabled();
  });

  it("handles beforeUpload correctly", async() => {
    const mockBeforeUpload = vi.fn(() => false); // Reject upload
    const { container } = render(<Upload beforeUpload={mockBeforeUpload} />);
    const input = container.querySelector(
      "input[type='file']"
    ) as HTMLInputElement;

    const file = new File(["test"], "test-file.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockBeforeUpload).toHaveBeenCalledWith(file, expect.any(Array));
  });
});
