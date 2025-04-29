import { FC } from "react";
import { default as BaseTree } from "antd/es/tree";
import type { TreeProps } from "antd/es/tree";

type Props = Pick<
  TreeProps,
  | "showLine"
  | "className"
  | "multiple"
  | "autoExpandParent"
  | "checkStrictly"
  | "checkable"
  | "disabled"
  | "expandedKeys"
  | "selectedKeys"
  | "selectable"
  | "draggable"
  | "showIcon"
  | "icon"
  | "switcherIcon"
  | "switcherLoadingIcon"
  | "prefixCls"
  | "children"
  | "blockNode"
  | "defaultExpandAll"
  | "defaultExpandParent"
  | "defaultExpandedKeys"
  | "defaultCheckedKeys"
  | "defaultSelectedKeys"
>;
export const Tree: FC<Props> = (props) => <BaseTree {...props} />;
