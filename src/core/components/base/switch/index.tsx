import { Flex, Typography } from "@/core/components/base";
import { useStyles } from "@/core/styled";
import { Switch as BaseSwitch, SwitchProps } from "antd";
import { FC } from "react";

type Props = Pick<
  SwitchProps,
  | "size"
  | "className"
  | "checked"
  | "defaultChecked"
  | "value"
  | "defaultValue"
  | "checkedChildren"
  | "unCheckedChildren"
  | "onChange"
  | "disabled"
  | "loading"
  | "style"
  | "title"
  | "id"
> & {
  label?: string;
};
export const Switch: FC<Props> = (props) => {
  const { styles } = useStyles();
  const { label, ...otherProps } = props;

  return (
    <Flex className={styles.formContainer}>
      {label && <Typography className={styles.formTitle}>{label}</Typography>}
      <BaseSwitch {...otherProps} />
    </Flex>
  );
};
