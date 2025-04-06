import { FC } from "react";
import { Layout as BaseLayout } from "antd";
import { BasicProps, Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

type Props = BasicProps;
export const Layout: FC<Props> & {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
} = (props) => <BaseLayout {...props} />;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
