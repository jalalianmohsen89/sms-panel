import { FC } from "react";
import { default as BaseCol } from "antd/es/col";
import type { ColProps } from "antd/es/col";

type Props = Pick<
  ColProps,
  | "flex"
  | "span"
  | "order"
  | "offset"
  | "push"
  | "pull"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "className"
> & {
  children?: React.ReactNode;
};
export const Col: FC<Props> = (props) => <BaseCol {...props} />;
