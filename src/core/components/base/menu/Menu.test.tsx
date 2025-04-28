import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Menu } from "@/core/components/base/menu";

describe("Menu Component", () => {
  it("renders menu with items", () => {
    render(
      <Menu>
        <Menu.Item key="item1">Item 1</Menu.Item>
        <Menu.Item key="item2">Item 2</Menu.Item>
      </Menu>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders a submenu", () => {
    render(
      <Menu mode="inline">
        <Menu.SubMenu key="submenu" title="SubMenu">
          <Menu.Item key="subitem1">Sub Item 1</Menu.Item>
          <Menu.Item key="subitem2">Sub Item 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    );

    const submenu = screen.getByText("SubMenu");

    expect(submenu).toBeInTheDocument();

    fireEvent.click(submenu);

    expect(screen.getByText("Sub Item 1")).toBeInTheDocument();
    expect(screen.getByText("Sub Item 2")).toBeInTheDocument();
  });

  it("renders a menu divider", () => {
    render(
      <Menu>
        <Menu.Item key="item1">Item 1</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="item2">Item 2</Menu.Item>
      </Menu>,
    );

    const divider = screen.getByRole("separator");

    expect(divider).toBeInTheDocument();
  });

  it("triggers onClick callback when item is clicked", () => {
    const handleClick = vi.fn();

    render(
      <Menu onClick={handleClick}>
        <Menu.Item key="item1">Item 1</Menu.Item>
      </Menu>,
    );

    const item = screen.getByText("Item 1");

    fireEvent.click(item);

    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ key: "item1" }),
    );
  });

  it("renders menu in horizontal mode", () => {
    const { container } = render(
      <Menu mode="horizontal">
        <Menu.Item key="item1">Item 1</Menu.Item>
        <Menu.Item key="item2">Item 2</Menu.Item>
      </Menu>,
    );

    const menu = container.querySelector(".ant-menu-horizontal");

    expect(menu).toBeInTheDocument();
  });

  it("renders menu in vertical mode", () => {
    const { container } = render(
      <Menu mode="vertical">
        <Menu.Item key="item1">Item 1</Menu.Item>
        <Menu.Item key="item2">Item 2</Menu.Item>
      </Menu>,
    );

    const menu = container.querySelector(".ant-menu-vertical");

    expect(menu).toBeInTheDocument();
  });

  it("applies custom styles", () => {
    render(
      <Menu style={{ backgroundColor: "red" }}>
        <Menu.Item key="item1">Styled Item</Menu.Item>
      </Menu>,
    );

    const menu = screen.getByText("Styled Item").closest(".ant-menu");
    const computedStyle = window.getComputedStyle(menu!);

    expect(computedStyle.backgroundColor).toBe("rgb(255, 0, 0)");
  });
});
