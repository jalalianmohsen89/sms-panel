import { Space, Typography } from "@/core/components/base";
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
