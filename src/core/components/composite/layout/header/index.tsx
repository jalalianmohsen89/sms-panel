import { Dispatch, FC, memo, SetStateAction } from "react";
import { css } from "@emotion/css";
import { Flex, Grid, Header as HeaderLayout } from "@/core/components/base";
import SearchBar from "./SearchBar";
import Tools from "@/core/components/composite/layout/header/Tools";
import { MenuSharp } from "@/core/icons";
import { useStyles } from "@/core/components/composite/layout/header/styled";
import { usePattern } from "@/core/context/PatternContext.tsx";

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
        className={css`
          width: 100%;
        `}
        align="center"
        justify="space-between"
      >
        {!screens.lg && (
          <Flex
            className={css`
              cursor: pointer;
              height: 25px;
              overflow: hidden;
            `}
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
