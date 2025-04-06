import { FC } from "react";
import { Input as InputBase, InputProps } from "antd";
import OTP from "antd/es/input/OTP";
import Search from "antd/es/input/Search";
import Password from "antd/es/input/Password";
import { theme as themeContent } from "@/core/theme";
import { FormContainer, FormTitle } from "@/core/styled";

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
> & {
  label?: string;
};

export const Input: FC<Props> & {
  Search: typeof Search;
  Password: typeof Password;
  OTP: typeof OTP;
} = (props) => {
  const { token } = themeContent.useToken();
  const { label, ...otherProps } = props;

  return (
    <FormContainer>
      {label && <FormTitle token={token}>{label}</FormTitle>}
      <InputBase {...otherProps} />
    </FormContainer>
  );
};

Input.Search = Search;
Input.Password = Password;
Input.OTP = OTP;

export { Search, Password, OTP };
