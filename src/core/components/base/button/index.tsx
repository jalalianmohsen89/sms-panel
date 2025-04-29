import { FC } from "react";
import { default as BaseButton } from "antd/es/button";
import type { ButtonProps } from "antd/es/button";

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
