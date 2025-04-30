import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  formContainer: {
    margin: "1rem",
  },
  rowMargin: {
    marginBottom: "20px",
  },
  contentContainer: {
    padding: "0.5rem 1rem",
  },
  uploadAlertList: {
    width: "100%",
    color: token.colorTextSecondary,
    fontSize: "20px",
  },
  uploadAlertItem: {
    marginBottom: "5px",
  },
  uploadAlertText: {
    fontSize: "16px",
    fontWeight: 500,
    color: token.colorTextSecondary,
  },
  textDescriptionContainer: {
    marginRight: "1rem",
  },
  iconRotate: {
    transform: "rotate(180deg)",
  },
}));
