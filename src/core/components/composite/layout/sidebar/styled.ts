import { hexToRgba } from "@/core/functions";
import { IPattern } from "@/core/types";
import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }, pattern: IPattern) => ({
  siderbox: {
    minHeight: "100vh",
    overflow: "hidden",
    background: hexToRgba(token.colorBgContainer, +pattern?.layoutOpacity),
  },
  sidebarContainer: {
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
      background: hexToRgba(token.colorBgContainer, +pattern?.containerOpacity),
    },
  },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  sidebarImage: {
    width: "18%",
    margin: "0 5px",
  },
  height100: {
    height: "100%",
  },
  sidebarLogoTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: token.colorInfoTextActive,
  },
  settingContainer: {
    height: "500px",
    alignItems: "flex-start",
  },
  navigation: {
    height: "calc(100% - 150px)",
    overflow: "auto",
    marginTop: "2rem",
    background: hexToRgba(token.colorBgContainer, +pattern?.navOpacity),
    "&.ant-menu-root": {
      borderInlineEnd: "unset!important",
    },
    ".ant-menu": {
      "&.ant-menu-sub": {
        width: "85%",
        marginBottom: "1rem",
        backgroundColor: "unset!important",
      },
    },
    ".ant-menu-item-icon": {
      color: "#36a2ef !important",
      fontSize: "18px !important",
    },

    ".ant-menu-submenu-title": {
      paddingRight: "25px!important",
      margin: "8px 0",
      "& .ant-menu-title-content": {
        fontSize: "14px !important",
      },
    },

    ".ant-menu-item": {
      // paddingRight: "15px!important",
      "& .ant-menu-title-content": {
        fontSize: "13px !important",
        filter: "brightness(0.6)",
      },
    },

    ".ant-menu-submenu": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: 0,
      margin: "0 8px",

      "&:last-child": {
        "&::after": {
          borderBottom: "unset",
        },
      },

      "&::after": {
        content: "''",
        width: "100%",
        height: "1px",
        borderBottom: `1px solid ${token.colorBorder}`,
      },
    },
  },
  ImageContainer: {
    borderBottom: `1px solid ${token.colorBorder}`,
    padding: "4px",
  },
  floatBox: {
    flexDirection: "column",
    gap: 10,
  },
  Quote: {
    padding: "0 1.2rem",
    backgroundColor: token.colorFillSecondary,
    userSelect: "none",
  },
  quoteContainer: {
    position: "relative",
    padding: "1rem",
    borderRadius: 12,
    "&::before": {
      color: "#9d68aa",
      content: "open-quote",
      fontSize: "2em",
      lineHeight: ".1em",
      marginLeft: ".15em",
      verticalAlign: "-.4em",
    },
  },
  quoteText: {
    color: token.colorTextSecondary,
    fontSize: "1rem",
  },
  lastUpdate: {
    color: token.colorText,
    fontSize: "11px",
    marginLeft: "8px",
  },
  floatPanel: {
    display: "flex",
    gap: "10px",
    paddingRight: "1rem",
  },
  settingModal: {
    "& .ant-modal-content": {
      backgroundColor: token.colorBgLayout,
      padding: "0",
    },
  },
  patternContainer: {
    padding: "1rem",
    flexWrap: "wrap",
  },
}));
