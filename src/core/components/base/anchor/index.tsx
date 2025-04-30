import { default as AnchorBase } from "antd/es/anchor";
import type { AnchorProps } from "antd/es/anchor";
import AnchorLink from "antd/es/anchor/AnchorLink";
import { FC } from "react";
import { useStyles } from "./styled";

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
} = (props) => {
  const { styles } = useStyles();

  return <AnchorBase className={styles.anchorStyle} {...props} />;
};

Anchor.Link = AnchorLink;
