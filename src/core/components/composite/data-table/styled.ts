import styled from "@emotion/styled";
import { TokenType } from "@/core/types";
import { Flex } from "@/core/components/base";

export const MobileColumns = styled(Flex)<TokenType>(({ token }) => ({
  width: "100%",
  border: `1px solid ${token.colorBorder}`,
  backgroundColor: token.colorBgContainer,
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  gap: "10px",
  alignItems: "flex-start"
}));

export const ActionContainer = styled(Flex)<TokenType>(({ token }) => ({
  alignItems: "center",
  cursor: "pointer",
  gap: "10px",
  padding: "5px",
  borderRadius: "5px",
  transition: "all 0.3s ease-in-out",
  svg: {
    color: token.colorText
  },
  "&:hover": {
    backgroundColor: token.colorBgContainerDisabled
  }
}));
