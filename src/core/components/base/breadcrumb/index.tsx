import { FC } from "react";
import { Breadcrumb as BaseBreadcrumb, BreadcrumbProps } from "antd";

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
