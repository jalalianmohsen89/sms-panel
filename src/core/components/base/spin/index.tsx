import { FC } from "react";
import { default as BaseSpin } from "antd/es/spin";
import type { SpinProps } from "antd/es/spin";

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
