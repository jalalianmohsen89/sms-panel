import { Flex } from "@/core/components/base";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/css";
const ErrorsLayout = () => (
  <Flex
    className={css`
      width: 100%;
      height: 100%;
    `}
  >
    <Outlet />
  </Flex>
);

export { ErrorsLayout };
