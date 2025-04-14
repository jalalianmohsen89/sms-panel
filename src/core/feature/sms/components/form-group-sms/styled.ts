import styled from "@emotion/styled";
import { Typography } from "@/core/components/base";
import { TokenType } from "@/core/types";

export const ModalTitle = styled(Typography)({
  fontSize: "22px",
  fontWeight: 800
});

export const ModalRowKey = styled(Typography)({
  fontSize: "18px",
  fontWeight: 800
});

export const ModalRowvalue = styled(Typography)<TokenType>(({ token }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: token.colorTextTertiary
}));

export const ModalGuide = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600
});
