import { Flex } from "@/core/components/base";
import { useStyles } from "@/core/components/composite/layout/header/styled";
import { Moon, Sunny } from "@/core/icons";
import useStore from "@/core/store";
const ThemeIcon = () => {
  // ---------------------- variables ---------------------
  const { theme, themeActions } = useStore();
  const { styles } = useStyles();

  // ---------------------- tsx ---------------------
  return (
    <Flex
      className={styles.toolsItemContainer}
      onClick={themeActions.toggleTheme}
    >
      {theme === "dark" ? (
        <Sunny className={styles.sunnyIcon} size="15" />
      ) : (
        <Moon className={styles.moonIcon} size="15" />
      )}
    </Flex>
  );
};

export default ThemeIcon;
