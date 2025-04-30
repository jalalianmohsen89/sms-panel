import { default as AlertBase } from "antd/es/alert";
import type { AlertProps } from "antd/es/alert";
import { FC } from "react";
import { useStyles } from "./styled";

type Props = Pick<
  AlertProps,
  | "type"
  | "closable"
  | "closeText"
  | "message"
  | "description"
  | "onClose"
  | "afterClose"
  | "showIcon"
  | "icon"
  | "closeIcon"
  | "action"
  | "className"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onClick"
>;
export const Alert: FC<Props> = (props) => {
  const { styles } = useStyles();

  return <AlertBase className={styles.alertStyle} {...props} />;
};
