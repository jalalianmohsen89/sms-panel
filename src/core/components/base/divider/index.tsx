import { FC } from "react";
import { Divider as BaseDivider } from "antd";
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
