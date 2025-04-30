import { FC } from "react";
import { default as BaseCard } from "antd/es/card";
import type { CardProps } from "antd/es/card";
import Grid from "antd/es/card/Grid";
import Meta from "antd/es/card/Meta";

type Props = Pick<
  CardProps,
  | "title"
  | "style"
  | "loading"
  | "children"
  | "size"
  | "type"
  | "cover"
  | "actions"
  | "activeTabKey"
  | "defaultActiveTabKey"
>;
export const Card: FC<Props> & {
  Grid: typeof Grid;
  Meta: typeof Meta;
} = (props) => <BaseCard {...props} />;

Card.Grid = Grid;
Card.Meta = Meta;
