import { FC } from "react";
import type { SkeletonProps } from "antd";
import { Skeleton as BaseSkeleton } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonImage from "antd/es/skeleton/Image";
import SkeletonNode from "antd/es/skeleton/Node";

type Props = Pick<
  SkeletonProps,
  | "active"
  | "loading"
  | "className"
  | "style"
  | "children"
  | "avatar"
  | "title"
  | "paragraph"
  | "round"
>;
export const Skeleton: FC<Props> & {
  Button: typeof SkeletonButton;
  Avatar: typeof SkeletonAvatar;
  Input: typeof SkeletonInput;
  Image: typeof SkeletonImage;
  Node: typeof SkeletonNode;
} = (props) => <BaseSkeleton {...props} />;

Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;
