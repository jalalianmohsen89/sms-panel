import { render, screen } from "@testing-library/react";
import { Layout } from "@/core/components/base/layout";

describe("Layout Component", () => {
  it("renders the layout with header, footer, content, and sider", () => {
    render(
      <Layout>
        <Layout.Header data-testid="header">Header Content</Layout.Header>
        <Layout.Content data-testid="content">Main Content</Layout.Content>
        <Layout.Sider data-testid="sider">Sidebar Content</Layout.Sider>
        <Layout.Footer data-testid="footer">Footer Content</Layout.Footer>
      </Layout>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("sider")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    expect(screen.getByTestId("header")).toHaveTextContent("Header Content");
    expect(screen.getByTestId("content")).toHaveTextContent("Main Content");
    expect(screen.getByTestId("sider")).toHaveTextContent("Sidebar Content");
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer Content");
  });

  it("applies custom props to the layout", () => {
    const { container } = render(
      <Layout data-testid="layout" className="custom-class">
        <Layout.Content>Main Content</Layout.Content>
      </Layout>,
    );

    const layout = container.querySelector(".ant-layout");

    expect(layout).toBeInTheDocument();
    expect(layout).toHaveClass("custom-class");
  });

  it("renders layout content without crashing", () => {
    render(<Layout.Content data-testid="content">Content Here</Layout.Content>);

    const content = screen.getByTestId("content");

    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Content Here");
  });

  it("renders layout header without crashing", () => {
    render(<Layout.Header data-testid="header">Header Here</Layout.Header>);

    const header = screen.getByTestId("header");

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Header Here");
  });

  it("renders layout footer without crashing", () => {
    render(<Layout.Footer data-testid="footer">Footer Here</Layout.Footer>);

    const footer = screen.getByTestId("footer");

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("Footer Here");
  });

  it("renders layout sider without crashing", () => {
    render(<Layout.Sider data-testid="sider">Sider Here</Layout.Sider>);

    const sider = screen.getByTestId("sider");

    expect(sider).toBeInTheDocument();
    expect(sider).toHaveTextContent("Sider Here");
  });
});
