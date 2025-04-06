import styled from "@emotion/styled";
import { TokenType } from "@/core/types";
import { hexToRgba } from "@/core/functions";
import { Flex, Typography } from "@/core/components/base";

export const FormContainer = styled(Flex)({
  width: "100%",
  flexDirection: "column",
  gap: 5
});

export const FormTitle = styled(Typography)<TokenType>(({ token }) => ({
  fontSize: "12px",
  color: token.colorText
}));

export const Section = styled("section")<TokenType & { isBorder?: boolean }>(
  ({ token, isBorder = true }) => ({
    backgroundColor: hexToRgba(token.colorBgContainer, isBorder ? 0.7 : 1),
    padding: "2rem",
    borderRadius: 12,
    marginBottom: "2rem",
    backdropFilter: "blur(40px)",
    border: `1px solid ${isBorder ? token.colorBorder : "transparent"}`
  })
);
