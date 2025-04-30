import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  container: {
    width: "80%",
    maxWidth: "350px",
    backgroundColor: token.colorBgContainer,
    borderRadius: "10px",
    padding: "1.5rem",
    margin: "1rem 0 15%",
  },
  width: {
    width: "100%",
  },
  titleContainer: {
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },
}));
