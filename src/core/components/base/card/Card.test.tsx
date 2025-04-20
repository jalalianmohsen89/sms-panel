import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Card } from "./index";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";

describe("Card Component", () => {
  it("renders basic card", () => {
    const { container } = render(<Card>Basic Card</Card>);

    expect(container.querySelector(".ant-card")).toBeInTheDocument();
    expect(container.querySelector(".ant-card-body")).toHaveTextContent(
      "Basic Card",
    );
  });

  it("renders card with title", () => {
    const { container } = render(<Card title="Card Title">Content</Card>);

    expect(container.querySelector(".ant-card-head-title")).toHaveTextContent(
      "Card Title",
    );
  });

  it("renders card with cover", () => {
    const { container } = render(
      <Card cover={<img alt="example" src="test.png" />}>Content</Card>,
    );

    expect(container.querySelector(".ant-card-cover")).toBeInTheDocument();
    expect(container.querySelector(".ant-card-cover img")).toHaveAttribute(
      "src",
      "test.png",
    );
  });

  it("renders card with actions", () => {
    const actions = [
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ];
    const { container } = render(<Card actions={actions}>Content</Card>);

    expect(container.querySelector(".ant-card-actions")).toBeInTheDocument();
    expect(container.querySelectorAll(".ant-card-actions li")).toHaveLength(2);
  });

  it("renders Card.Meta", () => {
    const { container } = render(
      <Card>
        <Card.Meta title="Meta Title" description="Meta Description" />
      </Card>,
    );

    expect(container.querySelector(".ant-card-meta-title")).toHaveTextContent(
      "Meta Title",
    );
    expect(
      container.querySelector(".ant-card-meta-description"),
    ).toHaveTextContent("Meta Description");
  });

  it("renders Card.Grid", () => {
    const { container } = render(
      <Card>
        <Card.Grid>Grid Content</Card.Grid>
      </Card>,
    );

    expect(container.querySelector(".ant-card-grid")).toBeInTheDocument();
    expect(container.querySelector(".ant-card-grid")).toHaveTextContent(
      "Grid Content",
    );
  });

  it("renders with different sizes", () => {
    const { container } = render(
      <>
        <Card size="small">Small Card</Card>
        <Card size="default">Default Card</Card>
      </>,
    );

    expect(container.querySelector(".ant-card-small")).toBeInTheDocument();
    expect(container.querySelector(".ant-card")).toBeInTheDocument();
  });

  it("renders in loading state", () => {
    const { container } = render(<Card loading>Loading Card</Card>);

    expect(container.querySelector(".ant-card-loading")).toBeInTheDocument();
  });
});
