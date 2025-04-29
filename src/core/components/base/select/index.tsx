import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import { useStyles as useStylesBase } from "@/core/styled";
import { default as BaseSelect } from "antd/es/select";
import type { SelectProps } from "antd/es/select";
import { OptGroup, Option } from "rc-select";
import { FC } from "react";
import { useStyles } from "./styled";

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
  | "loading"
> & {
  label?: string;
};
export const Select: FC<Props> & {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
} = (props) => {
  const { styles: stylesBase } = useStylesBase();
  const { styles } = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, className, ...otherProps } = props;

  return (
    <Flex className={stylesBase.formContainer}>
      {label && (
        <Typography className={stylesBase.formTitle}>{label}</Typography>
      )}
      <BaseSelect className={styles.width} {...otherProps} />
    </Flex>
  );
};

Select.Option = Option;
Select.OptGroup = OptGroup;
