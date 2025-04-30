import { FC } from "react";
import { default as BaseDrawer } from "antd/es/drawer";
import type { DrawerProps } from "antd/es/drawer";

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
