import { hexToRgba } from "@/core/functions";
import { createStyles } from "antd-style";

type IsBorderType = boolean | undefined;
export const useStyles = createStyles(
  ({ token }, isBorder: IsBorderType = true) => ({
    appContainer: {
      width: "100%",
      height: "100%",
    },
    section: {
      width: "100%",
      maxWidth: 1360,
      backgroundColor: hexToRgba(token.colorBgContainer, isBorder ? 0.7 : 1),
      padding: "2rem",
      borderRadius: 8,
      margin: "0 auto 2rem",
      backdropFilter: "blur(40px)",
      border: `1px solid ${isBorder ? token.colorBorder : "transparent"}`,
    },
    formContainer: {
      width: "100%",
      flexDirection: "column",
      gap: 5,
    },
    formTitle: {
      fontSize: "13px",
      color: token.colorTextSecondary,
      fontWeight: "bold",
      marginRight: 3,
    },
    titlePage: {
      width: "100%",
      maxWidth: "1360px",
      fontSize: "20px",
      fontWeight: "bold",
      margin: "0 auto",
    },
    modalTitle: {
      fontSize: "22px",
      fontWeight: 800,
    },
    modalRowKey: {
      fontSize: "18px",
      fontWeight: 800,
    },
    modalRowvalue: {
      fontSize: "18px",
      fontWeight: 600,
      color: token.colorTextTertiary,
    },
    modalGuide: {
      fontSize: "16px",
      fontWeight: 600,
    },
  }),
);
