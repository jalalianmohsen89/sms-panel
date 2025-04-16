import styled from "@emotion/styled";
import { TokenType } from "@/core/types";
import { hexToRgba } from "@/core/functions";
import { Flex, Typography } from "@/core/components/base";

export const FormContainer = styled(Flex)({
  width: "100%",
  flexDirection: "column",
  gap: 5,
});

export const FormTitle = styled(Typography)<TokenType>(({ token }) => ({
  fontSize: "13px",
  color: token.colorTextSecondary,
  fontWeight: "bold",
  marginRight: 3,
}));

export const Section = styled("section")<TokenType & { isBorder?: boolean }>(
  ({ token, isBorder = true }) => ({
    width: "100%",
    maxWidth: 1360,
    backgroundColor: hexToRgba(token.colorBgContainer, isBorder ? 0.7 : 1),
    padding: "2rem",
    borderRadius: 8,
    margin: "0 auto 2rem",
    backdropFilter: "blur(40px)",
    border: `1px solid ${isBorder ? token.colorBorder : "transparent"}`,
  }),
);

export const TitlePage = styled(Typography)({
  width: "100%",
  maxWidth: "1360px",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 auto",
});

export const ModalTitle = styled(Typography)({
  fontSize: "22px",
  fontWeight: 800,
});

export const ModalRowKey = styled(Typography)({
  fontSize: "18px",
  fontWeight: 800,
});

export const ModalRowvalue = styled(Typography)<TokenType>(({ token }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: token.colorTextTertiary,
}));

export const ModalGuide = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
});
