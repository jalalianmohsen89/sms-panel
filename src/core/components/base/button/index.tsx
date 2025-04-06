import { FC } from "react";
import { Button as BaseButton, ButtonProps } from "antd";

type Props = Pick<
  ButtonProps,
  | "type"
  | "color"
  | "variant"
  | "icon"
  | "iconPosition"
  | "size"
  | "danger"
  | "block"
  | "className"
  | "children"
  | "onClick"
  | "form"
> & {
  htmlType?: "button" | "submit" | "reset";
};

export const Button: FC<Props> = (props) => <BaseButton {...props} />;
