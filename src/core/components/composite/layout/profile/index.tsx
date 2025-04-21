import {
  Button,
  Divider,
  Dropdown,
  Flex,
  Space,
  Typography,
} from "@/core/components/base";
import {
  AvatarProfile,
  DropdownOption,
  DropdownProfileContainer,
  UserRole,
} from "@/core/components/composite/layout/profile/styled.ts";
import useStore from "@/core/store";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { FC } from "react";
import { CodeOutline, Settings } from "@/core/icons";

type Props = {
  onSelectOption: (option: string) => void;
};

export const Profile: FC<Props> = ({ onSelectOption }) => {
  // ---------------------- variables ---------------------
  const { token } = themeContent.useToken();
  const { Text } = Typography;

  // ---------------------- hooks ---------------------
  const { logout } = useStore();

  // ---------------------- methods ---------------------
  const dropdownRender = () => (
    <DropdownProfileContainer vertical>
      <Flex
        vertical
        gap={10}
        className={css`
          width: 200px;
          padding: 1rem;
          margin: 0 auto;
          border-radius: 8px;
          overflow: hidden;
          background-color: ${token.colorBgLayout};
        `}
      >
        <Flex
          vertical
          gap={10}
          className={css`
            padding: 0 0.8rem;
          `}
        >
          <Flex align="center" gap={10}>
            <AvatarProfile token={token} size="large">
              mj
            </AvatarProfile>
            <Flex vertical align="flex-start">
              <Text
                className={css`
                  font-size: 12px;
                  font-weight: bold;
                `}
              >
                کاربر سامانه
              </Text>
              <UserRole token={token}>مدیر </UserRole>
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <DropdownOption token={token} onClick={() => onSelectOption("setting")}>
          <Settings />
          <Text>تنظیمات</Text>
        </DropdownOption>
        <Divider />
        <Space
          className={css`
            padding: 0 1rem;
            margin: 0 auto;
          `}
        >
          <Button
            type="primary"
            className={css`
              font-size: 12px;
            `}
            onClick={logout}
          >
            خروج از حساب کاربری
          </Button>
        </Space>
      </Flex>
    </DropdownProfileContainer>
  );

  // ---------------------- render ---------------------
  return (
    <Flex>
      <Dropdown
        overlayClassName={css`
          padding-top: 3px;
          background-color: transparent;
        `}
        dropdownRender={dropdownRender}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
            width: 100%;
          `}
        >
          <Flex gap={10}>
            <AvatarProfile token={token} size="large">
              mj
            </AvatarProfile>
            <Flex vertical align="flex-start">
              <Text
                className={css`
                  font-size: 12px;
                  font-weight: bold;
                `}
              >
                کاربر سامانه
              </Text>
              <UserRole token={token}>مدیر </UserRole>
            </Flex>
          </Flex>
          <Space
            className={css`
              transform: rotate(90deg);
              cursor: pointer;
            `}
            size="middle"
          >
            <CodeOutline />
          </Space>
        </div>
      </Dropdown>
    </Flex>
  );
};
