import { Drawer } from "@/core/components/base/drawer";
import { Grid } from "@/core/components/base/grid";
import { Layout } from "@/core/components/base/layout";
import { Header, Sidebar } from "@/core/components/composite";
import { usePattern } from "@/core/context/PatternContext.tsx";
import { WithChildren } from "@/core/types";
import { FC, useState } from "react";
import { useStyles } from "./styled";

export const MasterLayout: FC<WithChildren> = ({ children }) => {
  // ---------------------- variables ---------------------
  const { Content } = Layout;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isCollapseSidebar, setCollapseSidebar] = useState(false);
  const { currentPattern } = usePattern();
  const { styles } = useStyles();

  // ---------------------- tsx ---------------------
  return (
    <>
      <Content className={styles.masterlayoutContainer}>
        <div
          className="backgroundPattern"
          style={{
            backgroundImage: `url(${currentPattern?.pattern})`,
            opacity: currentPattern?.patternOpacity,
          }}
        />
        <Layout className={styles.sidebarlayoutContainer}>
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
              className={styles.sidebarlayoutContainer}
            >
              <Sidebar />
            </Drawer>
          )}
          <div className={styles.headerContainer}>
            <Header
              isCollapsed={isCollapseSidebar}
              setCollapsed={setCollapseSidebar}
            />
            <div className={styles.headerContainerInner}>{children}</div>
          </div>
        </Layout>
      </Content>
    </>
  );
};
