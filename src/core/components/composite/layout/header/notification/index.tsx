import { Avatar } from "@/core/components/base/avatar";
import { Button } from "@/core/components/base/button";
import { Dropdown } from "@/core/components/base/dropdown";
import { Flex } from "@/core/components/base/flex";
import { Tooltip } from "@/core/components/base/tooltip";
import { Notifications } from "@/core/icons";
import { User2Fill, UserAddFill } from "@/core/icons";
import ContentNotif from "./ContentNotif";
import HeaderNotification from "./Header";
import InfoNotif from "./InfoNotif";
import { useStyles } from "./styled";

export const Notification = () => {
  // -------------------- variables --------------------------
  const { styles } = useStyles();

  const dropdownRennder = (
    <Flex vertical className={styles.dropdownRenderContainer}>
      <HeaderNotification title="اعلانات" />
      <Flex vertical>
        <Flex vertical className={styles.sectionContainer}>
          <InfoNotif
            avatar="مح"
            fullName="محسن جلالیان مقدم"
            description="پیامی برای شما ارسال کرد"
            date="چند دقیقه پیش"
            position="مدیر پنل"
          />
          <ContentNotif text="آماده برای خروچی گرفتن" date="09:00 - 10:00 ظهر">
            <Avatar.Group max={{ count: 3 }}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <a href="https://ant.design">
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              </a>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<User2Fill />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<UserAddFill />}
              />
            </Avatar.Group>
          </ContentNotif>
          <Flex className={styles.sectionButtons}>
            <Button type="default">رد</Button>
            <Button type="default">تایید</Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical>
        <Flex vertical className={styles.sectionContainer}>
          <InfoNotif
            avatar="مه"
            fullName="محمد هنرور"
            description="مقاله جدیدی را برای شما ارسال کرد"
            date="10 دقیقه پیش"
            position="کارشناس تولید محتوا"
          />
        </Flex>
      </Flex>

      <Flex vertical>
        <Flex vertical className={styles.sectionContainer}>
          <InfoNotif
            avatar="رف"
            fullName="رامین فیروز"
            description="تسک جدیدی را برای شما ایجاد کرد"
            date="20 دقیقه پیش"
            position="کارشناس سوشال"
          />
          <Flex className={styles.sectionButtons}>
            <Button type="default">رد</Button>
            <Button type="default">تایید</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );

  // -------------------- render --------------------------
  return (
    <Flex className={styles.dropdownContainer}>
      <Dropdown
        placement="bottom"
        overlayClassName={styles.dropdownPadding}
        dropdownRender={() => dropdownRennder}
      >
        <div className={styles.flex}>
          <Notifications className={styles.notificationIcon} size={16} />
        </div>
      </Dropdown>
    </Flex>
  );
};
