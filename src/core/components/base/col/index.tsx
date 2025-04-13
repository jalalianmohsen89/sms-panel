import { FC } from "react";
import { Col as BaseCol, ColProps } from "antd";

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
