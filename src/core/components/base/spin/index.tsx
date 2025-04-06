import { FC } from "react";
import { Spin as BaseSpin, SpinProps } from "antd";

type Props = Pick<
  SpinProps,
  | "spinning"
  | "style"
  | "size"
  | "tip"
  | "delay"
  | "indicator"
  | "children"
  | "fullscreen"
  | "percent"
  | "className"
>;
export const Spin: FC<Props> = (props) => <BaseSpin {...props} />;
