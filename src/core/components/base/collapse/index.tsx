import { FC } from "react";
import { default as BaseCollapse } from "antd/es/collapse";
import type { CollapseProps } from "antd/es/collapse";

export type Props = Pick<
  CollapseProps,
  | "activeKey"
  | "defaultActiveKey"
  | "accordion"
  | "destroyInactivePanel"
  | "onChange"
  | "style"
  | "className"
  | "expandIcon"
  | "expandIconPosition"
  | "ghost"
  | "size"
  | "collapsible"
  | "children"
  | "items"
>;
export const Collapse: FC<Props> = (props) => <BaseCollapse {...props} />;
