import { FC } from "react";
import { Space as BaseSpace, SpaceProps } from "antd";

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
