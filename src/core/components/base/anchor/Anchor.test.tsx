import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Anchor } from "@/core/components/base/anchor";

describe("Anchor Component", () => {
  it("renders with items", () => {
    const items = [
      {
        key: "1",
        href: "#part-1",
        title: "Part 1",
      },
      {
        key: "2",
        href: "#part-2",
        title: "Part 2",
      },
    ];

    render(<Anchor items={items} />);
    expect(screen.getByText("Part 1")).toBeDefined();
    expect(screen.getByText("Part 2")).toBeDefined();
  });

  it("renders with children using Anchor.Link", () => {
    render(
      <Anchor>
        <Anchor.Link href="#part-1" title="Part 1" />
        <Anchor.Link href="#part-2" title="Part 2" />
      </Anchor>,
    );

    expect(screen.getByText("Part 1")).toBeDefined();
    expect(screen.getByText("Part 2")).toBeDefined();
  });

  it("handles onClick event", () => {
    const onClick = vi.fn();
    const items = [
      {
        key: "1",
        href: "#part-1",
        title: "Part 1",
      },
    ];

    render(<Anchor items={items} onClick={onClick} />);
    const link = screen.getByText("Part 1");

    fireEvent.click(link);

    expect(onClick).toHaveBeenCalled();
  });

  it("renders with different directions", () => {
    const items = [
      {
        key: "1",
        href: "#part-1",
        title: "Part 1",
      },
    ];

    const { rerender } = render(
      <Anchor items={items} direction="vertical" className="anchor-vertical" />,
    );

    // انتخاب عنصر اصلی با کلاس
    const anchor = document.querySelector(".anchor-vertical");

    expect(anchor).toHaveClass("anchor-vertical");

    rerender(
      <Anchor
        items={items}
        direction="horizontal"
        className="anchor-horizontal"
      />,
    );

    expect(anchor).toHaveClass("anchor-horizontal");
  });

  it("renders with custom className", () => {
    const items = [
      {
        key: "1",
        href: "#part-1",
        title: "Part 1",
      },
    ];

    render(<Anchor items={items} className="custom-class" />);
    const anchor = screen.getByText("Part 1").closest(".custom-class");

    expect(anchor).toHaveClass("custom-class");
  });

  it("renders without items", () => {
    render(
      <div data-testid="anchor-wrapper">
        <Anchor />
      </div>,
    );
    const wrapper = screen.getByTestId("anchor-wrapper");

    expect(wrapper).toBeInTheDocument();
  });

  it("renders with empty items array", () => {
    render(
      <div data-testid="anchor-wrapper">
        <Anchor items={[]} />
      </div>,
    );
    const anchor = screen.getByTestId("anchor-wrapper");

    expect(anchor).toBeDefined();
  });

  it("renders with nested Anchor.Link components", () => {
    render(
      <Anchor>
        <Anchor.Link href="#part-1" title="Part 1">
          <Anchor.Link href="#part-1-1" title="Part 1.1" />
        </Anchor.Link>
        <Anchor.Link href="#part-2" title="Part 2" />
      </Anchor>,
    );

    expect(screen.getByText("Part 1")).toBeDefined();
    expect(screen.getByText("Part 1.1")).toBeDefined();
    expect(screen.getByText("Part 2")).toBeDefined();
  });

  it("renders with custom href", () => {
    const items = [
      {
        key: "1",
        href: "#custom-part-1",
        title: "Custom Part 1",
      },
    ];

    render(<Anchor items={items} />);
    const link = screen.getByText("Custom Part 1");

    expect(link).toHaveAttribute("href", "#custom-part-1");
  });
});
