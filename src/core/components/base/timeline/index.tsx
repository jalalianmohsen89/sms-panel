import { FC } from "react";
import { default as BaseTimeline } from "antd/es/timeline";
import type { TimelineProps } from "antd/es/timeline";
import Item from "antd/es/timeline/TimelineItem";

type Props = Pick<
  TimelineProps,
  | "className"
  | "pending"
  | "pendingDot"
  | "style"
  | "reverse"
  | "mode"
  | "items"
  | "children"
>;
export const Timeline: FC<Props> & {
  Item: typeof Item;
} = (props) => <BaseTimeline {...props} />;

Timeline.Item = Item;
