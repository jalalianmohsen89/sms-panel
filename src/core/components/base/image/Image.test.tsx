import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Image } from "@/core/components/base/image";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Image Component", () => {
  it("renders basic image", () => {
    const { container } = render(
      <Image src="test-image.jpg" alt="test image" loading="lazy" />,
    );
    const img = container.querySelector(".ant-image-img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test-image.jpg");
  });

  it("handles custom dimensions", () => {
    const { container } = render(
      <Image src="test-image.jpg" width={200} height={100} loading="lazy" />,
    );
    const img = container.querySelector(".ant-image-img");

    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "100");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Image src="test-image.jpg" onClick={handleClick} loading="lazy" />,
    );
    const img = container.querySelector(".ant-image-img");

    fireEvent.click(img!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("shows fallback on error", () => {
    const { container } = render(
      <Image
        src="invalid-image.jpg"
        fallback="fallback-image.jpg"
        loading="lazy"
      />,
    );
    const img = container.querySelector(".ant-image-img");

    fireEvent.error(img!);

    // بررسی نمایش fallback
    const fallbackElement = container.querySelector(".ant-image-mask");

    expect(fallbackElement).toBeInTheDocument();
  });

  it("renders with preview disabled", () => {
    const { container } = render(
      <Image src="test-image.jpg" preview={false} loading="lazy" />,
    );

    expect(container.querySelector(".ant-image-mask")).not.toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    const { container } = render(
      <Image
        src="test-image.jpg"
        loading="lazy"
        placeholder={<div className="custom-placeholder">Loading...</div>}
      />,
    );

    expect(container.querySelector(".custom-placeholder")).toBeInTheDocument();
  });
});
