import { FC, useState } from "react";
import { Drawer, Grid, Layout } from "@/core/components/base";
import { css } from "@emotion/css";
import { Header, Sidebar } from "@/core/components/composite";
import { theme as themeContent } from "@/core/theme";
import { usePattern } from "@/core/context/PatternContext.tsx";
import { WithChildren } from "@/core/types";

export const MasterLayout: FC<WithChildren> = ({ children }) => {
  // ---------------------- variables ---------------------
  const { token } = themeContent.useToken();
  const { Content } = Layout;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isCollapseSidebar, setCollapseSidebar] = useState(false);
  const { currentPattern } = usePattern();

  // ---------------------- tsx ---------------------
  return (
    <>
      <Content
        className={css`
          min-height: 100vh;
          position: relative;
        `}
      >
        <div
          className="backgroundPattern"
          style={{
            backgroundImage: `url(${currentPattern?.pattern})`,
            opacity: currentPattern?.patternOpacity,
          }}
        />
        <Layout
          className={css`
            height: 100%;
            min-height: 100vh;
          `}
        >
          {screens.lg ? (
            <Sidebar />
          ) : (
            <Drawer
              width="300"
              closable={false}
              destroyOnClose
              placement="right"
              open={isCollapseSidebar}
              onClose={() => setCollapseSidebar(false)}
              className={css`
                overflow: hidden;
              `}
            >
              <Sidebar />
            </Drawer>
          )}
          <div
            className={css`
              width: 100%;
              position: relative;
            `}
          >
            <Header
              isCollapsed={isCollapseSidebar}
              setCollapsed={setCollapseSidebar}
            />
            <div
              className={css`
                width: 100%;
                padding: 2rem;
                //background-color: ${token.colorBgLayout};
              `}
            >
              {children}
            </div>
          </div>
        </Layout>
      </Content>
    </>
  );
};
