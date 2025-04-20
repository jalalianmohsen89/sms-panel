import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Table } from "./index";

// Mock antd table component
vi.mock("antd", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Table: ({
    dataSource = [],
    columns = [],
    loading,
    pagination,
    bordered,
    size,
    onChange,
    className,
    style,
  }: {
    dataSource?: Array<any>;
    columns?: Array<any>;
    loading?: boolean;
    pagination?: any;
    bordered?: boolean;
    size?: "small" | "middle" | "large";
    onChange?: (pagination: any, filters: any, sorter: any) => void;
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <div
      className={`ant-table ${className || ""} ${
        bordered ? "ant-table-bordered" : ""
      } ${size ? `ant-table-${size}` : ""}`}
      style={style}
      data-testid="table"
      data-loading={loading}
    >
      <table>
        <thead>
          <tr>
            {columns.map((col: any, index: number) => (
              <th
                key={index}
                onClick={() =>
                  col.sorter && onChange?.({}, {}, { field: col.dataIndex })
                }
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row: any, rowIndex: number) => (
            <tr key={rowIndex} data-testid="table-row">
              {columns.map((col: any, colIndex: number) => (
                <td key={colIndex}>
                  {col.render
                    ? col.render(row[col.dataIndex], row)
                    : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="ant-pagination" data-testid="table-pagination">
          <button onClick={() => onChange?.({ current: 2 }, {}, {})}>
            Next
          </button>
        </div>
      )}
    </div>
  ),
}));

describe("Table Component", () => {
  const mockData = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
  ];

  const mockColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
  ];

  it("renders basic table", () => {
    const { getByTestId } = render(
      <Table dataSource={mockData} columns={mockColumns} />,
    );

    expect(getByTestId("table")).toHaveClass("ant-table");
  });

  it("renders correct number of rows", () => {
    const { getAllByTestId } = render(
      <Table dataSource={mockData} columns={mockColumns} />,
    );

    expect(getAllByTestId("table-row")).toHaveLength(2);
  });

  it("shows loading state", () => {
    const { getByTestId } = render(
      <Table dataSource={mockData} columns={mockColumns} loading />,
    );

    expect(getByTestId("table")).toHaveAttribute("data-loading", "true");
  });

  it("handles pagination change", () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <Table
        dataSource={mockData}
        columns={mockColumns}
        pagination={{ current: 1, pageSize: 10 }}
        onChange={handleChange}
      />,
    );

    const pagination = getByTestId("table-pagination");

    fireEvent.click(pagination.querySelector("button")!);
    expect(handleChange).toHaveBeenCalledWith({ current: 2 }, {}, {});
  });

  it("renders with borders", () => {
    const { getByTestId } = render(
      <Table dataSource={mockData} columns={mockColumns} bordered />,
    );

    expect(getByTestId("table")).toHaveClass("ant-table-bordered");
  });

  it("applies size variant", () => {
    const { getByTestId } = render(
      <Table dataSource={mockData} columns={mockColumns} size="small" />,
    );

    expect(getByTestId("table")).toHaveClass("ant-table-small");
  });

  it("handles column sorting", () => {
    const handleChange = vi.fn();
    const sortableColumns = [
      { title: "Name", dataIndex: "name", sorter: true },
    ];

    const { getByText } = render(
      <Table
        dataSource={mockData}
        columns={sortableColumns}
        onChange={handleChange}
      />,
    );

    fireEvent.click(getByText("Name"));
    expect(handleChange).toHaveBeenCalledWith({}, {}, { field: "name" });
  });

  it("renders custom cell content", () => {
    const columnsWithRender = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text: string) => <span>Custom-{text}</span>,
      },
    ];

    const { getByText } = render(
      <Table dataSource={mockData} columns={columnsWithRender} />,
    );

    expect(getByText("Custom-John")).toBeInTheDocument();
  });

  it("applies custom styling", () => {
    const { getByTestId } = render(
      <Table
        dataSource={mockData}
        columns={mockColumns}
        className="custom-table"
        style={{ margin: "20px" }}
      />,
    );

    const table = getByTestId("table");

    expect(table).toHaveClass("custom-table");
    expect(table).toHaveStyle({ margin: "20px" });
  });
});
