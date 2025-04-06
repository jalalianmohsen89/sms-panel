import { FC } from "react";
import { Tree as BaseTree, TreeProps } from "antd";

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
