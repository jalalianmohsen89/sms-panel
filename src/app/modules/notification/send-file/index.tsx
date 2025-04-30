import { Typography } from "@/core/components/base/typography";
import { Alert } from "@/core/components/base/alert";
import { Flex } from "@/core/components/base/flex";
import { Space } from "@/core/components/base/space";
import FormGroupNotif from "@/core/feature/notification/components/form-group-notif";
import { useStyles } from "@/core/feature/sms/styled";
import { useStyles as useStylesBase } from "@/core/styled";

const SendFile = () => {
  const { styles: stylesBase } = useStylesBase();
  const { styles } = useStyles();

  return (
    <Flex vertical gap={10}>
      <Typography className={stylesBase.titlePage}>
        ارسال از طریق فایل
      </Typography>
      <section className={stylesBase.section}>
        <Space className={styles.AlertMargin}>
          <Alert
            className={styles.AlertCustom}
            type="warning"
            showIcon
            message={
              <ul>
                <li>
                  <Typography className={styles.AlertItem}>
                    با توجه به قوانین و احترام به حقوق مصرف کننده، پیام‌های
                    تبلیغاتی تنها بین ساعات 07:00 الی 22:00 امکان ارسال دارند.
                  </Typography>
                </li>
                <li>
                  <Typography className={styles.AlertItem}>
                    پیرو اطلاعیه سازمان تنظیم مقررات و ارتباطات رادیویی، درج
                    عبارت «لغو۱۱» در انتهای تمامی پیام‌ها الزامی است و عدم اجرای
                    آن منجر به غیرفعال شدن خط و جریمه خواهد شد.
                  </Typography>
                </li>
                <li>
                  <Typography className={styles.AlertItem}>
                    با توجه به ارسال جعلی و فیشینگ (کلاهبرداری اینترنتی)،کلیه
                    ارسال‌های گروهی و انبوه قبل از ارسال، توسط واحد پشتیبانی،
                    کنترل و بررسی می‌شود.
                  </Typography>
                </li>
              </ul>
            }
          />
        </Space>
        <FormGroupNotif />
      </section>
    </Flex>
  );
};

export default SendFile;
