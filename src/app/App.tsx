import { Flex } from "@/core/components/base/flex";
import { useStyles } from "@/core/styled";
import { Outlet } from "react-router-dom";

function App() {
  const { styles } = useStyles();

  return (
    <Flex className={styles.appContainer}>
      <Outlet />
    </Flex>
  );
}

export default App;
