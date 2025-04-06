import { FC } from "react";
import { Drawer as BaseDrawer, DrawerProps } from "antd";

type Props = Pick<
  DrawerProps,
  | "size"
  | "open"
  | "afterOpenChange"
  | "visible"
  | "afterVisibleChange"
  | "classNames"
  | "destroyOnClose"
  | "styles"
  | "placement"
  | "title"
  | "width"
  | "closable"
  | "onClose"
  | "children"
  | "className"
  | "closeIcon"
>;
export const Drawer: FC<Props> = (props) => <BaseDrawer {...props} />;
