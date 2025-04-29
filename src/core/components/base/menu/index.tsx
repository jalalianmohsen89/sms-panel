import { FC } from "react";
import { default as BaseMenu } from "antd/es/menu";
import type { MenuProps } from "antd/es/menu";
import Item from "antd/es/menu/MenuItem";
import SubMenu from "antd/es/menu/SubMenu";
import MenuDivider from "antd/es/menu/MenuDivider";

export type Props = Pick<
  MenuProps,
  | "items"
  | "children"
  | "disabled"
  | "direction"
  | "mode"
  | "inlineCollapsed"
  | "defaultOpenKeys"
  | "openKeys"
  | "defaultActiveFirst"
  | "defaultSelectedKeys"
  | "selectedKeys"
  | "itemIcon"
  | "onClick"
  | "onOpenChange"
  | "style"
  | "className"
>;
export const Menu: FC<Props> & {
  Item: typeof Item;
  SubMenu: typeof SubMenu;
  Divider: typeof MenuDivider;
} = (props) => <BaseMenu {...props} />;

Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.Divider = MenuDivider;
