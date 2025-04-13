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
  | "icon"
  | "closeIcon"
  | "action"
  | "className"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onClick"
>;
export const Alert: FC<Props> = (props) => <AlertStyle {...props} />;
