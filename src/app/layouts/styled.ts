import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  authlayoutContainer: {
    height: "100%",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: token.colorBgLayout,
  },
  errorlayoutContainer: {
    width: "100%",
    height: "100%",
  },
  masterlayoutContainer: {
    minHeight: "100vh",
    position: "relative",
  },
  sidebarlayoutContainer: {
    minHeight: "100vh",
    height: "100%",
  },
  drawerOverflow: {
    overflow: "hidden",
  },
  headerContainer: {
    width: "100%",
    position: "relative",
  },
  headerContainerInner: {
    width: "100%",
    padding: "2rem",
  },
}));
