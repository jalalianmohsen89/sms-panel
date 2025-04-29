import { Flex } from "@/core/components/base/flex";
import { Grid } from "@/core/components/base/grid";
import { Header as HeaderLayout } from "@/core/components/base/layout";
import { useStyles } from "@/core/components/composite/layout/header/styled";
import Tools from "@/core/components/composite/layout/header/Tools";
import { usePattern } from "@/core/context/PatternContext.tsx";
import { MenuSharp } from "@/core/icons";
import { Dispatch, FC, memo, SetStateAction } from "react";
import SearchBar from "./SearchBar";

type Props = {
  isCollapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};
export const Header: FC<Props> = memo(({ isCollapsed, setCollapsed }) => {
  // ---------------------- variables ---------------------
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { currentPattern } = usePattern();
  const { styles } = useStyles(currentPattern);

  // ---------------------- methods ---------------------

  return (
    <HeaderLayout className={styles.masterHeader}>
      <Flex
        className={styles.headerWidth}
        align="center"
        justify="space-between"
      >
        {!screens.lg && (
          <Flex
            className={styles.headerContainer}
            onClick={() => setCollapsed(!isCollapsed)}
          >
            <MenuSharp size={20} />
          </Flex>
        )}
        {screens.lg && <SearchBar />}
        <Tools />
      </Flex>
    </HeaderLayout>
  );
});
