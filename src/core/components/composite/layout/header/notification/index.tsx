import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Tooltip,
} from "@/core/components/base";
import { css, css as cssStyle } from "@emotion/css";
import {
  NotificationIcon,
  ToolsItemContainer,
} from "@/core/components/composite/layout/header/styled.ts";
import { theme as themeContent } from "@/core/theme";
import { RiUser2Fill, RiUserAddFill } from "react-icons/ri";
import HeaderNotification from "./Header";
import InfoNotif from "./InfoNotif";
import ContentNotif from "./ContentNotif";

export const Notification = () => {
  // -------------------- variables --------------------------
  const { token } = themeContent.useToken();
  const dropdownRennder = () => (
    <Flex
      vertical
      className={css`
        width: 400px;
        border: 1px solid ${token.colorBorder};
        border-radius: 8px;
        background-color: ${token.colorBgLayout};
      `}
    >
      <HeaderNotification token={token} title="اعلانات" />
      <Flex vertical>
        <Flex
          vertical
          className={css`
            gap: 12px;
            border-bottom: 1px solid ${token.colorBorder};
          `}
        >
          <InfoNotif
            token={token}
            avatar="مح"
            fullName="محسن جلالیان مقدم"
            description="پیامی برای شما ارسال کرد"
            date="چند دقیقه پیش"
            position="مدیر پنل"
          />
          <ContentNotif
            token={token}
            text="آماده برای خروچی گرفتن"
            date="09:00 - 10:00 ظهر"
          >
            <Avatar.Group>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <a href="https://ant.design">
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              </a>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<RiUser2Fill />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<RiUserAddFill />}
              />
            </Avatar.Group>
          </ContentNotif>
          <Flex
            className={css`
              margin: 0 1.5rem 1rem;
              gap: 5px;
              justify-content: flex-end;
            `}
          >
            <Button type="default">رد</Button>
            <Button type="default">تایید</Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical>
        <Flex
          vertical
          className={css`
            gap: 12px;
            border-bottom: 1px solid ${token.colorBorder};
          `}
        >
          <InfoNotif
            token={token}
            avatar="مه"
            fullName="محمد هنرور"
            description="مقاله جدیدی را برای شما ارسال کرد"
            date="10 دقیقه پیش"
            position="کارشناس تولید محتوا"
          />
        </Flex>
      </Flex>

      <Flex vertical>
        <Flex
          vertical
          className={css`
            gap: 12px;
            border-bottom: 1px solid ${token.colorBorder};
          `}
        >
          <InfoNotif
            token={token}
            avatar="رف"
            fullName="رامین فیروز"
            description="تسک جدیدی را برای شما ایجاد کرد"
            date="20 دقیقه پیش"
            position="کارشناس سوشال"
          />
          <Flex
            className={css`
              margin: 0 1.5rem 1rem;
              gap: 5px;
              justify-content: flex-end;
            `}
          >
            <Button type="default">رد</Button>
            <Button type="default">تایید</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );

  // -------------------- render --------------------------
  return (
    <ToolsItemContainer>
      <Dropdown
        placement="bottom"
        overlayClassName={cssStyle`
            padding-top: 1rem;
            padding-left: 1rem
          `}
        dropdownRender={dropdownRennder}
      >
        <NotificationIcon />
      </Dropdown>
    </ToolsItemContainer>
  );
};
