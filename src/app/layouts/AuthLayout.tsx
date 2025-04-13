import { FC } from "react";
import { css } from "@emotion/css";
import { Flex } from "@/core/components/base";
import { theme as themeContent } from "@/core/theme";

type Props = {
  children: React.ReactNode;
};
const AuthLayout: FC<Props> = ({ children }) => {
  const { token } = themeContent.useToken();

  return (
    <Flex
      className={css`
        height: 100%;
        min-height: 100vh;
        width: 100%;
        background-color: ${token.colorBgLayout};
      `}
      align="center"
      justify="center"
    >
      {children}
    </Flex>
  );
};

export default AuthLayout;
