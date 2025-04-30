import { FC } from "react";
import { default as BaseTooltip } from "antd/es/tooltip";
import type { TooltipProps } from "antd/es/tooltip";

type Props = Pick<
  TooltipProps,
  | "style"
  | "title"
  | "className"
  | "color"
  | "placement"
  | "arrowPointAtCenter"
  | "arrow"
  | "children"
  | "arrowPointAtCenter"
>;
export const Tooltip: FC<Props> = (props) => <BaseTooltip {...props} />;
