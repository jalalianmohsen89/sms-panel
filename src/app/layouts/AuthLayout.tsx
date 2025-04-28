import { Flex } from "@/core/components/base/flex";
import { FC } from "react";
import { useStyles } from "./styled";

type Props = {
  children: React.ReactNode;
};
const AuthLayout: FC<Props> = ({ children }) => {
  const { styles } = useStyles();

  return (
    <Flex
      className={styles.authlayoutContainer}
      align="center"
      justify="center"
    >
      {children}
    </Flex>
  );
};

export default AuthLayout;
