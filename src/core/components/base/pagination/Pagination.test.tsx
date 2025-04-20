import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Pagination } from "./index";

// Mock antd pagination component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Pagination: ({
    total,
    current,
    pageSize,
    onChange,
    disabled = false,
    className,
    style,
    showQuickJumper,
  }: {
    total?: number;
    current?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize: number) => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    showQuickJumper?: boolean;
  }) => (
    <nav
      className={`ant-pagination ${className || ""}`}
      style={style}
      data-testid="pagination"
    >
      <ul>
        <li>
          <button
            onClick={() =>
              !disabled && onChange?.((current ?? 1) - 1, pageSize || 10)
            }
            disabled={disabled || current === 1}
            data-testid="prev-button"
          >
            Previous
          </button>
        </li>
        <li>
          <span data-testid="total-pages">
            {Math.ceil((total || 0) / (pageSize || 10))}
          </span>
        </li>
        <li>
          <button
            onClick={() =>
              !disabled && onChange?.((current ?? 1) + 1, pageSize || 10)
            }
            disabled={
              disabled || current === Math.ceil((total || 0) / (pageSize || 10))
            }
            data-testid="next-button"
          >
            Next
          </button>
        </li>
        {showQuickJumper && (
          <li>
            <input
              type="number"
              data-testid="quick-jumper"
              aria-label="quick-jumper"
              disabled={disabled}
            />
          </li>
        )}
      </ul>
    </nav>
  ),
}));

describe("Pagination Component", () => {
  it("renders basic pagination", () => {
    render(<Pagination total={100} />);
    expect(screen.getByTestId("pagination")).toHaveClass("ant-pagination");
  });

  it("handles page change", () => {
    const handleChange = vi.fn();

    render(<Pagination total={100} current={1} onChange={handleChange} />);

    fireEvent.click(screen.getByTestId("next-button"));
    expect(handleChange).toHaveBeenCalledWith(2, 10);
  });

  it("respects disabled state", () => {
    render(<Pagination total={100} disabled />);

    const prevButton = screen.getByTestId("prev-button");
    const nextButton = screen.getByTestId("next-button");

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("applies custom styling", () => {
    render(
      <Pagination
        total={100}
        className="custom-pagination"
        style={{ margin: "10px" }}
      />,
    );

    const pagination = screen.getByTestId("pagination");

    expect(pagination).toHaveClass("ant-pagination", "custom-pagination");
    expect(pagination).toHaveStyle({ margin: "10px" });
  });

  it("shows quick jumper when enabled", () => {
    render(<Pagination total={100} showQuickJumper />);

    const quickJumper = screen.getByTestId("quick-jumper");

    expect(quickJumper).toBeInTheDocument();
  });
});
