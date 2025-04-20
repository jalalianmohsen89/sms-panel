import React from "react";
import { render } from "@testing-library/react";
import { Timeline } from "./index";

// Mock antd Timeline component
vi.mock("antd", () => {
  const TimelineItem = ({
    children,
    color,
    dot,
    position,
    label,
    className,
  }: {
    children?: React.ReactNode;
    color?: string;
    dot?: React.ReactNode;
    position?: string;
    label?: React.ReactNode;
    className?: string;
  }) => (
    <li
      className={`ant-timeline-item ${className || ""}`}
      data-testid="timeline-item"
      data-color={color}
      data-position={position}
    >
      {dot && (
        <div className="ant-timeline-item-dot" data-testid="custom-dot">
          {dot}
        </div>
      )}
      {label && (
        <div className="ant-timeline-item-label" data-testid="item-label">
          {label}
        </div>
      )}
      <div className="ant-timeline-item-content">{children}</div>
    </li>
  );

  const ActualTimeline = ({
    children,
    mode,
    pending,
    reverse,
    className,
    style,
  }: {
    children?: React.ReactNode;
    mode?: "left" | "right" | "alternate";
    pending?: React.ReactNode | boolean;
    reverse?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <ul
      className={`ant-timeline ${mode ? `ant-timeline-${mode}` : ""} ${className || ""}`}
      style={style}
      data-testid="timeline"
      data-mode={mode}
      data-reverse={reverse}
    >
      {children}
      {pending && (
        <li className="ant-timeline-item-pending" data-testid="pending-item">
          {typeof pending === "boolean" ? "Loading..." : pending}
        </li>
      )}
    </ul>
  );

  ActualTimeline.Item = TimelineItem;

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Timeline: ActualTimeline,
  };
});

describe("Timeline Component", () => {
  it("renders basic timeline", () => {
    const { getByTestId } = render(
      <Timeline>
        <Timeline.Item>Event 1</Timeline.Item>
      </Timeline>,
    );

    expect(getByTestId("timeline")).toHaveClass("ant-timeline");
  });

  it("renders with different modes", () => {
    const { getByTestId } = render(
      <Timeline mode="alternate">
        <Timeline.Item>Event 1</Timeline.Item>
      </Timeline>,
    );

    expect(getByTestId("timeline")).toHaveAttribute("data-mode", "alternate");
  });

  it("renders pending state", () => {
    const { getByTestId } = render(
      <Timeline pending="Loading...">
        <Timeline.Item>Event 1</Timeline.Item>
      </Timeline>,
    );

    expect(getByTestId("pending-item")).toBeInTheDocument();
  });

  it("renders timeline item with custom dot", () => {
    const { getByTestId } = render(
      <Timeline>
        <Timeline.Item dot={<span>•</span>}>Event 1</Timeline.Item>
      </Timeline>,
    );

    expect(getByTestId("timeline")).toBeInTheDocument();
  });

  it("renders with reverse order", () => {
    const { getByTestId } = render(
      <Timeline reverse>
        <Timeline.Item>Event 1</Timeline.Item>
      </Timeline>,
    );

    expect(getByTestId("timeline")).toHaveAttribute("data-reverse", "true");
  });
});
