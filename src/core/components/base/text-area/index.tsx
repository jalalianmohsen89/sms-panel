import { FormContainer, FormTitle } from "@/core/styled";
import { theme as themeContent } from "@/core/theme";
import { default as TextAreaBase } from "antd/es/input/TextArea";
import { TextAreaProps } from "antd/lib/input";
import { FC } from "react";

type Props = Pick<
  TextAreaProps,
  | "bordered"
  | "size"
  | "status"
  | "rootClassName"
  | "variant"
  | "autoSize"
  | "className"
  | "value"
  | "onResize"
  | "onChange"
  | "placeholder"
  | "rows"
  | "allowClear"
> & {
  label?: string;
};

export const TextArea: FC<Props> = (props) => {
  const { token } = themeContent.useToken();
  const { label, ...otherProps } = props;

  return (
    <FormContainer>
      {label && <FormTitle token={token}>{label}</FormTitle>}
      <TextAreaBase {...otherProps} />
    </FormContainer>
  );
};
