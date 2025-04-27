import { Flex, Typography } from "@/core/components/base";
import { useStyles } from "@/core/styled";
import { Input as InputBase, InputProps } from "antd";
import OTP from "antd/es/input/OTP";
import Password from "antd/es/input/Password";
import Search from "antd/es/input/Search";
import { FC } from "react";

type Props = Pick<
  InputProps,
  | "size"
  | "type"
  | "disabled"
  | "status"
  | "variant"
  | "placeholder"
  | "prefix"
  | "suffix"
  | "onPressEnter"
  | "onChange"
  | "onInput"
  | "value"
  | "className"
  | "maxLength"
  | "style"
> & {
  label?: string;
};

export const Input: FC<Props> & {
  Search: typeof Search;
  Password: typeof Password;
  OTP: typeof OTP;
} = (props) => {
  const { label, ...otherProps } = props;
  const { styles } = useStyles();

  return (
    <Flex className={styles.formContainer}>
      {label && <Typography className={styles.formTitle}>{label}</Typography>}
      <InputBase {...otherProps} />
    </Flex>
  );
};

Input.Search = Search;
Input.Password = Password;
Input.OTP = OTP;

export { OTP, Password, Search };
