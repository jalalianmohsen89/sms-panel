import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  uploadRuleContainer: {
    border: `1px dashed ${token.colorBorder}`,
    borderRadius: "6px",
    padding: "2rem",
    margin: "30px 0 20px 20px",
  },
  excelContainer: {
    width: "100px",
    height: "100px",
    backgroundColor: token.colorPrimaryBg,
    borderRadius: "50%",
  },
  excelIconBox: {
    width: "30px",
  },
  excelIcon: {
    fill: "#1cc086",
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
}));
