import styled from "@emotion/styled";
import {
  Flex,
  Layout,
  Menu,
  Modal,
  Segmented,
  Typography
} from "@/core/components/base";
import { PatternType, TokenType } from "@/core/types";
import { hexToRgba } from "@/core/functions";

const { Text } = Typography;
const { Sider } = Layout;

export const SiderBox = styled(Sider)<TokenType & PatternType>(
  ({ token, pattern }) => ({
    minHeight: "100vh",
    overflow: "hidden",
    background: hexToRgba(token.colorBgContainer, +pattern?.layoutOpacity)
  })
);

export const SidebarContainer = styled("div")<TokenType & PatternType>(
  ({ token, pattern }) => ({
    position: "fixed" as any,
    border: `1px solid ${token.colorBorder}`,
    background: token.colorBgContainer,
    right: 0,
    left: "calc(100% - 300px)",
    bottom: 0,
    top: 0,

    "@media (min-width: 991px)": {
      right: 5,
      bottom: 0,
      top: 5,
      borderRadius: "16px 16px 16px 0",
      overflow: "hidden",
      backdropFilter: `blur(${pattern?.blur}px)`,
      background: hexToRgba(token.colorBgContainer, +pattern?.containerOpacity)
    }
  })
);

export const Navigation = styled(Menu)<TokenType & PatternType>(
  ({ token, pattern }) => ({
    height: "calc(100% - 150px)",
    overflow: "auto",
    marginTop: "2rem",
    background: hexToRgba(token.colorBgContainer, +pattern?.navOpacity),
    "&.ant-menu-root": {
      borderInlineEnd: "unset!important"
    },
    ".ant-menu": {
      "&.ant-menu-sub": {
        width: "85%",
        marginBottom: "1rem",
        backgroundColor: "unset!important"
      }
    },
    ".ant-menu-item-icon": {
      color: "#36a2ef !important",
      fontSize: "18px !important"
    },

    ".ant-menu-submenu-title": {
      paddingRight: "25px!important",
      margin: "8px 0",
      "& .ant-menu-title-content": {
        fontSize: "14px !important"
      }
    },

    ".ant-menu-item": {
      // paddingRight: "15px!important",
      "& .ant-menu-title-content": {
        fontSize: "13px !important",
        filter: "brightness(0.6)"
      }
    },

    ".ant-menu-submenu": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: 0,
      margin: "0 8px",

      "&::after": {
        content: "''",
        width: "100%",
        height: "1px"
      }
    }
  })
);

export const ImageContainer = styled(Flex)<TokenType>(({ token }) => ({
  borderBottom: `1px solid ${token.colorBorder}`,
  padding: "4px"
}));

export const FloatBox = styled(Flex)({
  flexDirection: "column",
  gap: 10
});

export const Quote = styled(Flex)<TokenType>(({ token }) => ({
  padding: "0 1.2rem",
  backgroundColor: token.colorFillSecondary,
  userSelect: "none"
}));

export const QuoteContainer = styled(Typography)({
  position: "relative",
  padding: "1rem",
  borderRadius: 12,
  "&::before": {
    color: "#9d68aa",
    content: "open-quote",
    fontSize: "2em",
    lineHeight: ".1em",
    marginLeft: ".15em",
    verticalAlign: "-.4em"
  }
});

export const QuoteText = styled(Text)<TokenType>(({ token }) => ({
  color: token.colorTextSecondary,
  fontSize: "1rem"
}));

export const LastUpdate = styled(Text)<TokenType>(({ token }) => ({
  color: token.colorText,
  fontSize: "11px",
  marginLeft: "8px"
}));

export const FloatPanel = styled(Typography)({
  display: "flex",
  gap: "10px",
  paddingRight: "1rem"
});

export const SettingModal = styled(Modal)<TokenType>(({ token }) => ({
  "& .ant-modal-content": {
    backgroundColor: token.colorBgLayout,
    padding: "0"
  }
}));

export const Segments = styled(Segmented)<TokenType>(({ token }) => ({
  width: "100%",
  padding: "5px",
  margin: "5px",
  backgroundColor: token.colorBgContainerDisabled,
  boxShadow: `0 0 3px ${token.colorBgContainer}`,

  "& .ant-segmented-item": {
    width: "100px",
    padding: "5px 10px",
    marginBottom: "5px",
    backgroundColor: token.colorBgSolid
  }
}));
