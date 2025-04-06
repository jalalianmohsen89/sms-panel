import { FC } from "react";
import { Switch as BaseSwitch, SwitchProps } from "antd";
import { theme as themeContent } from "@/core/theme";
import { FormContainer, FormTitle } from "@/core/styled";

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
  const { token } = themeContent.useToken();
  const { label, ...otherProps } = props;

  return (
    <FormContainer>
      {label && <FormTitle token={token}>{label}</FormTitle>}
      <BaseSwitch {...otherProps} />
    </FormContainer>
  );
};
