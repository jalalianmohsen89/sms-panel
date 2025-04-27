import { createStyles } from "antd-style";

export const useStyles = createStyles(() => ({
  loading: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    zIndex: 20,
  },
}));
