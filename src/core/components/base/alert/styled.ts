import { createStyles } from "@/core/theme/styled";

export const useStyles = createStyles(({ css }) => ({
  alertStyle: css`
    & .ant-alert-message {
      font-size: clamp(14px, 2vw, 16px);
    }
    & .ant-alert-description {
      font-size: clamp(12px, 2vw, 14px);
    }
  `,
}));
