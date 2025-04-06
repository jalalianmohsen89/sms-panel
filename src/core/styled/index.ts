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
    width: "100%",
    maxWidth: 1360,
    backgroundColor: hexToRgba(token.colorBgContainer, isBorder ? 0.7 : 1),
    padding: "2rem",
    borderRadius: 12,
    margin: "0 auto 2rem",
    backdropFilter: "blur(40px)",
    border: `1px solid ${isBorder ? token.colorBorder : "transparent"}`
  })
);

export const TitlePage = styled(Typography)({
  width: "100%",
  maxWidth: "1360px",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 auto"
});
