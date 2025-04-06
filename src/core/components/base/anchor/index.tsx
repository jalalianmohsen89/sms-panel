import { FC } from "react";
import { AnchorProps } from "antd";
import AnchorLink from "antd/es/anchor/AnchorLink";
import { AnchorStyle } from "./styled";

type Props = Pick<
  AnchorProps,
  | "className"
  | "style"
  | "children"
  | "offsetTop"
  | "bounds"
  | "showInkInFixed"
  | "onClick"
  | "onChange"
  | "items"
  | "direction"
  | "replace"
>;
export const Anchor: FC<Props> & {
  Link: typeof AnchorLink;
} = (props) => <AnchorStyle {...props} />;

Anchor.Link = AnchorLink;
