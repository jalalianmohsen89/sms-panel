import { Anchor } from "@/core/components/base/anchor";
import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import { Grid } from "@/core/components/base/grid";
import { Notification } from "@/core/components/composite";
import { useStyles } from "@/core/components/composite/layout/header/styled";
import ThemeIcon from "@/core/components/composite/layout/header/ThemeIcon.tsx";
import { Search } from "@/core/icons";

const Tools = () => {
  // ---------------------- variables ---------------------
  const { Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { styles } = useStyles();

  // ---------------------- render ---------------------
  return (
    <Flex className={styles.toolsContainer}>
      <Typography>
        <Text className={styles.toolsDateTitle}>شنبه 19 آبان</Text>
      </Typography>
      {!screens.lg && (
        <Flex>
          <Anchor.Link
            href={"google.com"}
            title={<Search />}
            className={styles.searchIcon}
          />
        </Flex>
      )}
      <ThemeIcon />
      <Notification />
    </Flex>
  );
};

export default Tools;
