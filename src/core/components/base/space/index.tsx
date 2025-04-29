import { FC } from "react";
import { default as BaseSpace } from "antd/es/space";
import type { SpaceProps } from "antd/es/space";

type Props = Pick<
  SpaceProps,
  | "className"
  | "rootClassName"
  | "style"
  | "size"
  | "direction"
  | "align"
  | "split"
  | "wrap"
  | "children"
  | "onClick"
>;
export const Space: FC<Props> = (props) => <BaseSpace {...props} />;
