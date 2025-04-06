import styled from "@emotion/styled";
import { Avatar, Flex, Typography } from "@/core/components/base";
import { TokenType } from "@/core/types";

const { Text } = Typography;

export const DropdownProfileContainer = styled(Flex)({
  gap: 10,
  padding: "1rem 0",
  userSelect: "none"
});

export const UserRole = styled(Text)<TokenType>(({ token }) => ({
  fontSize: "11px",
  fontWeight: "bold",
  color: token.colorPrimaryText
}));

export const AvatarProfile = styled(Avatar)<TokenType>(({ token }) => ({
  gap: 20,
  cursor: "pointer",
  backgroundColor: token.colorPrimary
}));

export const DropdownOption = styled(Flex)<TokenType>(({ token }) => ({
  alignItems: "center",
  gap: 10,
  padding: "6px 1.5rem",
  cursor: "pointer",
  borderRadius: "12px",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    backgroundColor: token.colorBgContainerDisabled
  }
}));
