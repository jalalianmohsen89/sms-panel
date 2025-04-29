import { createStyles } from "antd-style";

export const useStyles = createStyles(() => ({
  title: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "2rem",
  },
  formContainer: {
    height: "100%",
    flexWrap: "wrap",
    alignContent: "space-between",
  },
  width: {
    width: "100%",
  },
  buttonContainer: {
    marginLeft: "1rem",
  },
}));
