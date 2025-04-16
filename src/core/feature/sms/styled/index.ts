import { Alert, Flex, Space, Typography } from "@/core/components/base";
import { TokenType } from "@/core/types";
import styled from "@emotion/styled";

export const AlertCustom = styled(Alert)<TokenType>(({ token }) => ({
  width: "100%",
  borderRadius: 8,
  padding: "1rem",
  border: "none",
  ".ant-alert-icon": {
    color: token.colorWarningTextActive,
    fontSize: "24px",
  },
}));
export const AlertItem = styled(Typography)<TokenType>(({ token }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: token.colorWarningTextActive,
}));

export const UploadAlertList = styled("ul")<TokenType>(({ token }) => ({
  width: "100%",
  color: token.colorTextSecondary,
  fontSize: "20px",
}));

export const UploadAlertItem = styled("li")({
  marginBottom: "5px",
});

export const UploadAlertText = styled(Typography)<TokenType>(({ token }) => ({
  fontSize: "16px",
  fontWeight: 500,
  color: token.colorTextSecondary,
}));

export const ToolbarEditorContainer = styled(Flex)<TokenType>(({ token }) => ({
  width: "100%",
  borderTop: `2px dashed ${token.colorBorder}`,
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  padding: "0.5rem",
  gap: 10,
}));

export const ToolbarEditorItem = styled(Space)<TokenType>(({ token }) => ({
  padding: "4px 1rem",
  backgroundColor: token.colorBgContainerDisabled,
  color: token.colorTextSecondary,
  borderRadius: 8,
}));
