import { FC } from "react";
import { default as BaseAvatar } from "antd/es/avatar";
import type { AvatarProps } from "antd/es/avatar";
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
