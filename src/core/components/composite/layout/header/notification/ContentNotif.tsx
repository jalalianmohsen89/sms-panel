import { Flex, Space, Typography } from "@/core/components/base";
import { FC, ReactNode } from "react";
import { useStyles } from "./styled";

type Props = {
  text: string;
  date: string;
  children?: ReactNode;
};
const ContentNotif: FC<Props> = ({ text, date, children }) => {
  const { styles } = useStyles();

  return (
    <Flex className={styles.contentNotificationContainer}>
      <Flex align="center" gap={10}>
        <Flex vertical className={styles.dateNotificationContainer}>
          <Space className={styles.dateNotification}>
            <Typography className={styles.dateTitleNotification}>
              آبان
            </Typography>
          </Space>
          <Space className={styles.datePaddingNotification}>
            <Typography>12</Typography>
          </Space>
        </Flex>
        <Flex vertical>
          <Typography className={styles.contentText}>{text}</Typography>
          <Typography className={styles.contentDate}>{date}</Typography>
        </Flex>
      </Flex>
      {children && <Flex>{children}</Flex>}
    </Flex>
  );
};

export default ContentNotif;
