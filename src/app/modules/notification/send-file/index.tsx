import { Flex, Space } from "@/core/components/base";
import FormGroupNotif from "@/core/feature/notification/components/form-group-notif";
import { AlertCustom, AlertItem } from "@/core/feature/sms/styled";
import { Section, TitlePage } from "@/core/styled";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";

const SendFile = () => {
  const { token } = themeContent.useToken();

  return (
    <Flex vertical gap={10}>
      <TitlePage>ارسال از طریق فایل</TitlePage>
      <Section token={token}>
        <Space
          className={css`
            margin-bottom: 30px;
          `}
        >
          <AlertCustom
            token={token}
            type="warning"
            showIcon
            message={
              <ul>
                <li>
                  <AlertItem token={token}>
                    با توجه به قوانین و احترام به حقوق مصرف کننده، پیام‌های
                    تبلیغاتی تنها بین ساعات 07:00 الی 22:00 امکان ارسال دارند.
                  </AlertItem>
                </li>
                <li>
                  <AlertItem token={token}>
                    پیرو اطلاعیه سازمان تنظیم مقررات و ارتباطات رادیویی، درج
                    عبارت «لغو۱۱» در انتهای تمامی پیام‌ها الزامی است و عدم اجرای
                    آن منجر به غیرفعال شدن خط و جریمه خواهد شد.
                  </AlertItem>
                </li>
                <li>
                  <AlertItem token={token}>
                    با توجه به ارسال جعلی و فیشینگ (کلاهبرداری اینترنتی)،کلیه
                    ارسال‌های گروهی و انبوه قبل از ارسال، توسط واحد پشتیبانی،
                    کنترل و بررسی می‌شود.
                  </AlertItem>
                </li>
              </ul>
            }
          />
        </Space>
        <FormGroupNotif />
      </Section>
    </Flex>
  );
};

export default SendFile;
