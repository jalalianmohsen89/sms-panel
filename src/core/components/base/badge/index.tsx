import { FC } from "react";
import { default as BaseBadge } from "antd/es/badge";
import type { BadgeProps } from "antd/es/badge";

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
