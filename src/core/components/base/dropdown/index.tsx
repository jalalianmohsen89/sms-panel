import { FC } from "react";
import { default as BaseDropdown } from "antd/es/dropdown";
import type { DropdownProps } from "antd/es/dropdown";

export type Props = Pick<
  DropdownProps,
  | "menu"
  | "autoFocus"
  | "arrow"
  | "trigger"
  | "dropdownRender"
  | "onOpenChange"
  | "open"
  | "disabled"
  | "destroyPopupOnHide"
  | "align"
  | "className"
  | "transitionName"
  | "overlayClassName"
  | "placement"
  | "forceRender"
  | "mouseEnterDelay"
  | "mouseLeaveDelay"
  | "children"
  | "autoAdjustOverflow"
  | "overlay"
  | "visible"
  | "onVisibleChange"
  | "getPopupContainer"
>;
export const Dropdown: FC<Props> = (props) => <BaseDropdown {...props} />;
