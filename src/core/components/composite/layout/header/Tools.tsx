import { Anchor, Flex, Grid, Typography } from "@/core/components/base";
import { Notification } from "@/core/components/composite";
import { useStyles } from "@/core/components/composite/layout/header/styled";
import ThemeIcon from "@/core/components/composite/layout/header/ThemeIcon.tsx";
import { Search } from "@/core/icons";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";

const Tools = () => {
  // ---------------------- variables ---------------------
  const { token } = themeContent.useToken();
  const { Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { styles } = useStyles();

  // ---------------------- render ---------------------
  return (
    <Flex className={styles.toolsContainer}>
      <Typography>
        <Text
          className={css`
            font-size: 12px;
            color: ${token.colorTextSecondary};
          `}
        >
          شنبه 19 آبان
        </Text>
      </Typography>
      {!screens.lg && (
        <Flex>
          <Anchor.Link
            href={"google.com"}
            title={<Search />}
            className={css`
              display: flex;
              align-items: center;
            `}
          />
        </Flex>
      )}
      <ThemeIcon />
      <Notification />
    </Flex>
  );
};

export default Tools;
