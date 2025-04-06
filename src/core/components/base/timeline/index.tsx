import { FC } from "react";
import { Timeline as BaseTimeline, TimelineProps } from "antd";
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
