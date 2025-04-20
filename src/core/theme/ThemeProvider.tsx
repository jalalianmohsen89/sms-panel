import { AppRoutes } from "@/app/routing/AppRoutes.tsx";
import { PatternProvider } from "@/core/context/PatternContext.tsx";
import { JalaliLocaleListener } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import { FC, ReactNode, useMemo } from "react";
import "react18-json-view/src/style.css";
import useStore from "../store";
import { ConfigProvider, darkTheme, lightTheme } from "../theme";

type Props = {
  children?: ReactNode;
};
const ThemeProvider: FC<Props> = ({ children }) => {
  // ---------------------- hooks ---------------------
  const { theme } = useStore();
  const createTheme = useMemo(
    () => (theme === "dark" ? darkTheme : lightTheme),
    [theme],
  );

  // ---------------------- render ---------------------
  return (
    <ConfigProvider theme={createTheme} direction={"rtl"} locale={fa_IR}>
      <JalaliLocaleListener />
      <PatternProvider>
        <AppRoutes />
        {children}
      </PatternProvider>
    </ConfigProvider>
  );
};

export default ThemeProvider;
