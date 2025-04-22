import { FC } from "react";
import { Avatar as BaseAvatar, AvatarProps } from "antd";
import AvatarGroup from "antd/es/avatar/AvatarGroup";

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
  Group: typeof AvatarGroup;
} = (props) => <BaseAvatar {...props} />;

Avatar.Group = AvatarGroup;
