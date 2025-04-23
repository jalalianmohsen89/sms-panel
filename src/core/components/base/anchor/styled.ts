import { createStyles } from "@/core/theme/styled";

export const useStyles = createStyles(({ css }) => ({
  anchorStyle: css`
    & .ant-anchor-link-title {
      font-size: clamp(12px, 2vw, 14px);
    }
  `,
}));
