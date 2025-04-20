import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "./index";

// Mock antd skeleton component
vi.mock("antd", () => {
  const ActualSkeleton = ({
    active,
    loading,
    className,
    style,
    children,
    avatar,
    title,
    paragraph,
    round,
  }: {
    active?: boolean;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    avatar?: boolean;
    title?: boolean;
    paragraph?: boolean;
    round?: boolean;
  }) => (
    <div
      className={`ant-skeleton ${active ? "ant-skeleton-active" : ""} ${
        className || ""
      }`}
      style={style}
      data-testid="skeleton"
      data-loading={loading}
      data-round={round}
    >
      {avatar && <div data-testid="skeleton-avatar" />}
      {title && <div data-testid="skeleton-title" />}
      {paragraph && <div data-testid="skeleton-paragraph" />}
      {!loading && children}
    </div>
  );

  // Add static properties to ActualSkeleton
  ActualSkeleton.Button = () => (
    <div className="ant-skeleton-button" data-testid="skeleton-button" />
  );
  ActualSkeleton.Avatar = () => (
    <div
      className="ant-skeleton-avatar"
      data-testid="skeleton-avatar-component"
    />
  );
  ActualSkeleton.Input = () => (
    <div className="ant-skeleton-input" data-testid="skeleton-input" />
  );
  ActualSkeleton.Image = () => (
    <div className="ant-skeleton-image" data-testid="skeleton-image" />
  );
  ActualSkeleton.Node = () => (
    <div className="ant-skeleton-node" data-testid="skeleton-node" />
  );

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Skeleton: ActualSkeleton,
  };
});

describe("Skeleton Component", () => {
  it("renders basic skeleton", () => {
    const { getByTestId } = render(<Skeleton />);

    expect(getByTestId("skeleton")).toHaveClass("ant-skeleton");
  });

  it("applies active animation", () => {
    const { getByTestId } = render(<Skeleton active />);

    expect(getByTestId("skeleton")).toHaveClass("ant-skeleton-active");
  });

  it("handles loading state with children", () => {
    const { getByTestId, queryByText } = render(
      <Skeleton loading>
        <div>Content</div>
      </Skeleton>,
    );

    expect(getByTestId("skeleton")).toHaveAttribute("data-loading", "true");
    expect(queryByText("Content")).not.toBeInTheDocument();
  });

  it("shows children when not loading", () => {
    const { getByText } = render(
      <Skeleton loading={false}>
        <div>Content</div>
      </Skeleton>,
    );

    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders with avatar", () => {
    const { getByTestId } = render(<Skeleton avatar />);

    expect(getByTestId("skeleton-avatar")).toBeInTheDocument();
  });

  it("renders with title", () => {
    const { getByTestId } = render(<Skeleton title />);

    expect(getByTestId("skeleton-title")).toBeInTheDocument();
  });

  it("renders with paragraph", () => {
    const { getByTestId } = render(<Skeleton paragraph />);

    expect(getByTestId("skeleton-paragraph")).toBeInTheDocument();
  });

  it("applies custom styling", () => {
    const { getByTestId } = render(
      <Skeleton
        className="custom-skeleton"
        style={{ backgroundColor: "red" }}
      />,
    );

    const skeleton = getByTestId("skeleton");

    expect(skeleton).toHaveClass("custom-skeleton");
    // expect(skeleton).toHaveStyle({ backgroundColor: "red" });
  });

  it("applies round style", () => {
    const { getByTestId } = render(<Skeleton round />);

    expect(getByTestId("skeleton")).toHaveAttribute("data-round", "true");
  });
});
