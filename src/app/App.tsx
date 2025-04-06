import { Flex } from "@/core/components/base";
import { css } from "@emotion/css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Flex
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <Outlet />
    </Flex>
  );
}

export default App;
