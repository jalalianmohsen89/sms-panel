import { FC } from "react";
import { Avatar as BaseAvatar, AvatarProps } from "antd";
import Group from "antd/es/avatar";

type Props = Pick<
  AvatarProps,
  | "shape"
  | "size"
  | "gap"
  | "src"
  | "srcSet"
  | "draggable"
  | "icon"
  | "style"
  | "children"
  | "alt"
  | "crossOrigin"
  | "className"
  | "onClick"
  | "onError"
>;
export const Avatar: FC<Props> & {
  Group: typeof Group;
} = (props) => <BaseAvatar {...props} />;

Avatar.Group = Group;
