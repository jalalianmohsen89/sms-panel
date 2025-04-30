import { FC } from "react";
import { default as BaseBreadcrumb } from "antd/es/breadcrumb";
import type { BreadcrumbProps } from "antd/es/breadcrumb";

type Props = Pick<
  BreadcrumbProps,
  | "prefixCls"
  | "params"
  | "separator"
  | "className"
  | "children"
  | "routes"
  | "items"
  | "itemRender"
>;
export const Breadcrumb: FC<Props> = (props) => <BaseBreadcrumb {...props} />;
