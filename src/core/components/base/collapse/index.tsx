import { FC } from "react";
import { Collapse as BaseCollapse, CollapseProps } from "antd";

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
