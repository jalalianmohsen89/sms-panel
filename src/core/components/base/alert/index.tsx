import { FC } from "react";
import { AlertProps } from "antd";
import { AlertStyle } from "./styled";

type Props = Pick<
  AlertProps,
  | "type"
  | "closable"
  | "closeText"
  | "message"
  | "description"
  | "onClose"
  | "afterClose"
  | "showIcon"
  | "style"
  | "icon"
  | "closeIcon"
  | "action"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onClick"
>;
export const Alert: FC<Props> = (props) => <AlertStyle {...props} />;
