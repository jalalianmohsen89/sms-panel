import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DevToolsContext } from "@/core/context/DevToolsContext";
import Devtools from "./index";
import "@testing-library/jest-dom/vitest";

// Mock all base components
vi.mock("@/core/components/base", async() => ({
  Button: vi.fn(({ children, onClick, className }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )),
  Modal: vi.fn(({ children, open, onCancel, onOk }) =>
    open ? (
      <div role="dialog">
        {children}
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onOk}>OK</button>
      </div>
    ) : null
  ),
  Flex: vi.fn(({ children, vertical, className, gap }) => (
    <div
      className={`flex ${className || ""} ${vertical ? "vertical" : ""}`}
      style={{ gap }}
    >
      {children}
    </div>
  )),
  Space: vi.fn(({ children, className }) => (
    <div className={`space ${className || ""}`}>{children}</div>
  )),
  Typography: vi.fn(({ children }) => <span>{children}</span>),
  Table: vi.fn(({ columns, dataSource, className }) => (
    <table className={className}>
      <thead>
        <tr>
          {columns?.map((col: any) => (
            <th key={col.key || col.dataIndex}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource?.map((row: any, index: number) => (
          <tr key={index}>
            {columns?.map((col: any) => (
              <td key={col.key || col.dataIndex}>
                {col.render
                  ? col.render(row[col.dataIndex], row)
                  : row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ))
}));

// Mock theme
vi.mock("@/core/theme", () => ({
  theme: {
    useToken: () => ({
      token: {
        colorFillSecondary: "#f0f0f0"
      }
    })
  }
}));

// Mock JsonView
vi.mock("react18-json-view", () => ({
  default: vi.fn(({ src }) => (
    <div data-testid="json-viewer">{JSON.stringify(src)}</div>
  ))
}));

// Mock data
const mockDevToolsData = {
  pageName: "صفحه تست",
  pageUrl: "/test-page",
  apis: [
    {
      name: "API تست",
      url: "/api/test",
      params: "param1=value1",
      list: {
        data: [{ id: 1, name: "داده تست" }]
      }
    }
  ]
};

describe("Devtools Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDevtools = () =>
    render(
      <DevToolsContext.Provider value={{ data: mockDevToolsData }}>
        <Devtools />
      </DevToolsContext.Provider>
    );

  it("باید دکمه devtools را نمایش دهد", () => {
    renderDevtools();
    const button = screen.getByRole("button", { name: /devtools/i });

    expect(button).toBeInTheDocument();
  });

  it("باید با کلیک روی دکمه مودال را باز کند", async() => {
    renderDevtools();
    const devtoolsButton = screen.getByRole("button", { name: /devtools/i });

    fireEvent.click(devtoolsButton);

    await waitFor(() => {
      const modal = screen.getByRole("dialog");

      expect(modal).toBeInTheDocument();
      expect(screen.getByText("مدیریت داده ها")).toBeInTheDocument();
    });
  });

  it("باید اطلاعات صفحه را در مودال نمایش دهد", async() => {
    renderDevtools();
    const devtoolsButton = screen.getByRole("button", { name: /devtools/i });

    fireEvent.click(devtoolsButton);

    await waitFor(() => {
      expect(screen.getByText("نام صفحه :")).toBeInTheDocument();
      expect(screen.getByText("صفحه تست")).toBeInTheDocument();
      expect(screen.getByText("آدرس صفحه :")).toBeInTheDocument();
      expect(screen.getByText("/test-page")).toBeInTheDocument();
    });
  });

  it("باید جدول API‌ها را با داده‌های صحیح نمایش دهد", async() => {
    renderDevtools();
    fireEvent.click(screen.getByRole("button", { name: /devtools/i }));

    await waitFor(() => {
      expect(screen.getByText("API تست")).toBeInTheDocument();
      expect(screen.getByText("/api/test")).toBeInTheDocument();
      expect(screen.getByText("param1=value1")).toBeInTheDocument();
    });
  });

  it("باید با کلیک روی نمایش/مخفی جزئیات را نشان دهد", async() => {
    renderDevtools();
    fireEvent.click(screen.getByRole("button", { name: /devtools/i }));

    await waitFor(() => {
      const showButton = screen.getByText("نمایش");

      fireEvent.click(showButton);
      expect(screen.getByTestId("json-viewer")).toBeInTheDocument();
    });
  });

  it("باید با بستن مودال state را ریست کند", async() => {
    renderDevtools();
    const devtoolsButton = screen.getByRole("button", { name: /devtools/i });

    fireEvent.click(devtoolsButton);
    await waitFor(() => {
      const showButton = screen.getByText("نمایش");

      fireEvent.click(showButton);
    });

    const closeButton = screen.getByText("Cancel");

    fireEvent.click(closeButton);

    fireEvent.click(devtoolsButton);
    await waitFor(() => {
      expect(screen.queryByTestId("json-viewer")).not.toBeInTheDocument();
    });
  });
});
