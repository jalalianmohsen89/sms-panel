import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  Space,
  Typography,
} from "@/core/components/base";
import { CodeOutline, Settings } from "@/core/icons";
import useStore from "@/core/store";
import { FC, memo } from "react";
import { useStyles } from "./styled";

type Props = {
  onSelectOption: (option: string) => void;
};

export const Profile: FC<Props> = memo(({ onSelectOption }) => {
  // ---------------------- variables ---------------------
  const { Text } = Typography;
  const { styles } = useStyles();

  // ---------------------- hooks ---------------------
  const { logout } = useStore();

  // ---------------------- methods ---------------------
  const dropdownRender = () => (
    <Flex className={styles.dropdownProfileContainer} vertical>
      <Flex vertical gap={10} className={styles.porfileContainer}>
        <Flex vertical gap={10} className={styles.userPadding}>
          <Flex align="center" gap={10}>
            <Avatar className={styles.avatarProfile} size="large">
              mj
            </Avatar>
            <Flex vertical align="flex-start">
              <Text className={styles.userPostTitle}>کاربر سامانه</Text>
              <Text className={styles.userRole}>مدیر </Text>
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <Flex
          className={styles.dropdownOption}
          onClick={() => onSelectOption("setting")}
        >
          <Settings />
          <Text>تنظیمات</Text>
        </Flex>
        <Divider />
        <Space className={styles.settingOption}>
          <Button
            type="primary"
            className={styles.settingButton}
            onClick={logout}
          >
            خروج از حساب کاربری
          </Button>
        </Space>
      </Flex>
    </Flex>
  );

  // ---------------------- render ---------------------
  return (
    <Flex>
      <Dropdown
        overlayClassName={styles.profileOverlay}
        dropdownRender={dropdownRender}
      >
        <div className={styles.profileDropdownContainer}>
          <Flex gap={10}>
            <Avatar className={styles.avatarProfile} size="large">
              mj
            </Avatar>
            <Flex vertical align="flex-start">
              <Text className={styles.userPostTitle}>کاربر سامانه</Text>
              <Text className={styles.userRole}>مدیر </Text>
            </Flex>
          </Flex>
          <Space className={styles.profileDropdownIcon} size="middle">
            <CodeOutline />
          </Space>
        </div>
      </Dropdown>
    </Flex>
  );
});
