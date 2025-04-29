import * as React from "react";
import { FC, ReactNode } from "react";
import { default as BaseTypography } from "antd/es/typography";
import type { DirectionType } from "antd/es/config-provider";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

type Props = {
  direction?: DirectionType;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};
export const Typography: FC<Props> & {
  Text: typeof Text;
  Link: typeof Link;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
} = (props) => <BaseTypography {...props} />;

Typography.Text = Text;
Typography.Link = Link;
Typography.Title = Title;
Typography.Paragraph = Paragraph;

export { Text, Link, Title, Paragraph };
