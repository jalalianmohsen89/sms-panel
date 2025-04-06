import { FC } from "react";
import { Flex as BaseFlex } from "antd";
import { FlexProps } from "antd/lib";

type Props = Pick<
  FlexProps,
  | "prefixCls"
  | "className"
  | "vertical"
  | "wrap"
  | "justify"
  | "align"
  | "flex"
  | "gap"
  | "children"
  | "component"
  | "style"
  | "onClick"
>;
export const Flex: FC<Props> = (props) => {
  const { children, ...otherProps } = props;

  return <BaseFlex {...otherProps}>{children}</BaseFlex>;
};
