import { FC } from "react";
import { Select as BaseSelect, SelectProps } from "antd";
import { OptGroup, Option } from "rc-select";
import { css } from "@emotion/css";
import { theme as themeContent } from "@/core/theme";
import { FormContainer, FormTitle } from "@/core/styled";

export type Props = Pick<
  SelectProps,
  | "placement"
  | "title"
  | "defaultValue"
  | "mode"
  | "value"
  | "status"
  | "dropdownMatchSelectWidth"
  | "popupMatchSelectWidth"
  | "style"
  | "placeholder"
  | "options"
  | "onChange"
  | "className"
  | "allowClear"
  | "disabled"
  | "showSearch"
  | "filterSort"
  | "optionFilterProp"
  | "maxTagCount"
  | "optionRender"
  | "size"
> & {
  label?: string;
};
export const Select: FC<Props> & {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
} = (props) => {
  const { token } = themeContent.useToken();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, className, ...otherProps } = props;

  return (
    <FormContainer>
      {label && <FormTitle token={token}>{label}</FormTitle>}
      <BaseSelect
        className={css`
          width: 100%;
        `}
        {...otherProps}
      />
    </FormContainer>
  );
};

Select.Option = Option;
Select.OptGroup = OptGroup;
