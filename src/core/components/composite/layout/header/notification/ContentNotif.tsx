import { Flex, GlobalToken, Space, Typography } from "@/core/components/base";
import { css } from "@emotion/css";
import { FC, ReactNode } from "react";

type Props = {
  token: GlobalToken;
  text: string;
  date: string;
  children?: ReactNode;
};
const ContentNotif: FC<Props> = ({ token, text, date, children }) => (
  <Flex
    className={css`
      border-radius: 8px;
      background-color: ${token.colorBgContainerDisabled};
      padding: 10px 1rem;
      margin: 0 2.5rem 0.5rem 1.5rem;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    `}
  >
    <Flex align="center" gap={10}>
      <Flex
        vertical
        className={css`
          width: 30px;
          border-radius: 5px;
          border: 1px solid ${token.colorWarning};
          align-items: center;
        `}
      >
        <Space
          className={css`
            border-bottom: 1px solid ${token.colorWarning};
            background-color: rgba(${token.colorWarningTextHover});
            padding: 3px;
          `}
        >
          <Typography
            className={css`
              color: ${token.colorWarning};
            `}
          >
            آبان
          </Typography>
        </Space>
        <Space
          className={css`
            padding: 3px;
          `}
        >
          <Typography>12</Typography>
        </Space>
      </Flex>
      <Flex vertical>
        <Typography
          className={css`
            font-size: 12px;
          `}
        >
          {text}
        </Typography>
        <Typography
          className={css`
            font-size: 13px;
          `}
        >
          {date}
        </Typography>
      </Flex>
    </Flex>
    {children && <Flex>{children}</Flex>}
  </Flex>
);

export default ContentNotif;
