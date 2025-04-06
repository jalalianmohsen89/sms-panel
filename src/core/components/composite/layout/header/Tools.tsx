import { Anchor, Flex, Grid, Typography } from "@/core/components/base";
import { css } from "@emotion/css";
import { theme as themeContent } from "@/core/theme";
import { Search } from "@/core/icons";
import { Notification } from "@/core/components/composite";
import { ToolsContainer } from "@/core/components/composite/layout/header/styled";
import ThemeIcon from "@/core/components/composite/layout/header/ThemeIcon.tsx";

const Tools = () => {
  // ---------------------- variables ---------------------
  const { token } = themeContent.useToken();
  const { Text } = Typography;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // ---------------------- render ---------------------
  return (
    <ToolsContainer>
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
    </ToolsContainer>
  );
};

export default Tools;
