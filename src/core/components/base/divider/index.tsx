import { FC } from "react";
import { default as BaseDivider } from "antd/es/divider";
import { DividerProps } from "antd/es/divider";

type Props = Pick<
  DividerProps,
  | "type"
  | "orientation"
  | "orientationMargin"
  | "className"
  | "children"
  | "dashed"
  | "variant"
  | "style"
  | "plain"
>;
export const Divider: FC<Props> = (props) => <BaseDivider {...props} />;
