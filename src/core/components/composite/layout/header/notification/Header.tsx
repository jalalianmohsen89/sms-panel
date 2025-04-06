import { GlobalToken, Space, Typography } from "@/core/components/base";
import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  token: GlobalToken;
  title: string;
};
const HeaderNotification: FC<Props> = ({ token, title }) => (
  <Space
    className={css`
      padding: 12px 1rem;
      border-bottom: 1px solid ${token.colorBorder};
    `}
  >
    <Typography
      className={css`
        font-size: 1rem;
      `}
    >
      {title}
    </Typography>
  </Space>
);

export default HeaderNotification;
