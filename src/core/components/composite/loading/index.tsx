import { Spin } from "@/core/components/base/spin";
import { useStyles } from "./styled";

export const Loading = () => {
  const { styles } = useStyles();

  return (
    <Spin tip="درحال بارگزاری ..." size="large" fullscreen>
      <div className={styles.loading} />
    </Spin>
  );
};
