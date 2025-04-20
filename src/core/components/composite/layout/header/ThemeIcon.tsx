import {
  MoonIcon,
  SunnyIcon,
  ToolsItemContainer,
} from "@/core/components/composite/layout/header/styled";
import useStore from "@/core/store";
import { theme as themeContent } from "@/core/theme";
const ThemeIcon = () => {
  // ---------------------- variables ---------------------
  const { theme, themeActions } = useStore();
  const { token } = themeContent.useToken();

  // ---------------------- tsx ---------------------
  return (
    <ToolsItemContainer onClick={themeActions.toggleTheme}>
      {theme === "dark" ? (
        <SunnyIcon token={token} size="15" />
      ) : (
        <MoonIcon token={token} size="15" />
      )}
    </ToolsItemContainer>
  );
};

export default ThemeIcon;
