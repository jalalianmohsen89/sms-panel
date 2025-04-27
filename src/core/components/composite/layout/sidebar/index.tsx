import {
  Flex,
  Image,
  Layout,
  Menu,
  Modal,
  Typography,
} from "@/core/components/base";
import { Profile } from "@/core/components/composite";
import PatternSelect from "@/core/components/composite/layout/sidebar/PatternSelect.tsx";
import { useStyles } from "@/core/components/composite/layout/sidebar/styled";
import { navigation } from "@/core/content";
import { usePattern } from "@/core/context/PatternContext.tsx";
import { memo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Sidebar = memo(() => {
  // ---------------------- variables ---------------------
  const { currentPattern } = usePattern();
  const { styles } = useStyles(currentPattern);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [openKeys] = useState<string[]>([path[1]]);
  const [selectedKeys] = useState<string[]>([path[2]]);
  const { Sider } = Layout;

  // ---------------------- methods ---------------------

  const onSelectOption = () => {
    setOpenSetting(true);
  };

  const changePage = (event: any) => {
    navigate(`/${event.keyPath[1]}/${event.keyPath[0]}`, {
      state: {
        openKeys: event.keyPath[1],
        selectedKeys: event.keyPath[0],
      }, // ارسال state به صفحه جدید
    });
  };

  // ---------------------- render ---------------------
  return (
    <Sider className={styles.siderbox} width={300}>
      <div className={styles.sidebarContainer}>
        <Flex className={styles.ImageContainer}>
          <Link to="/" className={styles.sidebarLink}>
            <Image
              src="/media/brand-logo.png"
              preview={false}
              wrapperClassName={styles.sidebarImage}
            />
            <Typography className={styles.sidebarLogoTitle}>
              پنل مدیریت پیامک
            </Typography>
          </Link>
        </Flex>
        <Flex vertical className={styles.height100}>
          <Menu
            className={styles.navigation}
            mode="inline"
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            items={navigation}
            onClick={(event) => changePage(event)}
          />
          <Flex className={styles.floatBox}>
            <Profile onSelectOption={onSelectOption} />
          </Flex>
        </Flex>
      </div>
      <Modal
        className={styles.settingModal}
        title="تنظیمات"
        width={"600px"}
        open={isOpenSetting}
        onCancel={() => setOpenSetting(false)}
        footer={[<div> </div>]}
        closable={false}
      >
        <Flex className={styles.settingContainer}>
          <Flex>
            <PatternSelect />
          </Flex>
        </Flex>
      </Modal>
    </Sider>
  );
});
