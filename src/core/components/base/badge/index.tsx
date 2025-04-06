import { FC } from "react";
import { Badge as BaseBadge, BadgeProps } from "antd";

type Props = Pick<
  BadgeProps,
  | "count"
  | "showZero"
  | "overflowCount"
  | "dot"
  | "style"
  | "className"
  | "status"
  | "color"
  | "text"
  | "size"
  | "offset"
  | "title"
  | "children"
>;
export const Badge: FC<Props> = (props) => <BaseBadge {...props} />;
