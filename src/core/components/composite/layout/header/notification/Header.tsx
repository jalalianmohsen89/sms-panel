import { Space } from "@/core/components/base/space";
import { Typography } from "@/core/components/base/typography";
import { FC } from "react";
import { useStyles } from "./styled";

type Props = {
  title: string;
};
const HeaderNotification: FC<Props> = ({ title }) => {
  const { styles } = useStyles();

  return (
    <Space className={styles.headerNotificationContainer}>
      <Typography className={styles.titleSize}>{title}</Typography>
    </Space>
  );
};

export default HeaderNotification;
