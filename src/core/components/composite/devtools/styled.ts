import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  devToolsButton: {
    position: "fixed",
    left: "40%",
    bottom: "10px",
    zIndex: 1000,
  },
  devToolsContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: "50px",
  },
  jsonContainer: {
    backgroundColor: token.colorFillSecondary,
    maxHeight: "300px",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    overflow: "auto",
  },
  width: {
    width: "100%",
  },
  zIndex1000: {
    zIndex: 1000,
  },
  direction: {
    direction: "ltr",
  },
  pointer: {
    cursor: "pointer",
  },
}));
