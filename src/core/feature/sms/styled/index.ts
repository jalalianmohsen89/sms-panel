import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  AlertMargin: {
    marginBottom: "30px",
  },
  AlertCustom: {
    width: "100%",
    borderRadius: 8,
    padding: "1rem",
    border: "none",
    ".ant-alert-icon": {
      color: token.colorWarningTextActive,
      fontSize: "24px",
    },
  },
  AlertItem: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    color: token.colorWarningTextActive,
  },
  UploadAlertList: {
    width: "100%",
    color: token.colorTextSecondary,
    fontSize: "20px",
  },
  UploadAlertItem: {
    marginBottom: "5px",
  },
  UploadAlertText: {
    fontSize: "16px",
    fontWeight: 500,
    color: token.colorTextSecondary,
  },
}));
