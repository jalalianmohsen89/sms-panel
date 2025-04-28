import { Flex } from "@/core/components/base/flex";
import { Outlet } from "react-router-dom";
import { useStyles } from "./styled";
const ErrorsLayout = () => {
  const { styles } = useStyles();

  return (
    <Flex className={styles.errorlayoutContainer}>
      <Outlet />
    </Flex>
  );
};

export { ErrorsLayout };
