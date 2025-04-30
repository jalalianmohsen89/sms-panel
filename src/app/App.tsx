import { Flex } from "@/core/components/base/flex";
import { useStyles } from "@/core/styled";
import { Outlet } from "react-router-dom";
import NavigationBinder from "@/core/navigation/NavigationBinder.tsx";

function App() {
  const { styles } = useStyles();

  return (
    <Flex className={styles.appContainer}>
      <NavigationBinder />
      <Outlet />
    </Flex>
  );
}

export default App;
