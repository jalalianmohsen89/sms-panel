import { FC } from "react";
import { Tooltip as BaseTooltip, TooltipProps } from "antd";

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
