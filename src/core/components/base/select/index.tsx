import { Flex, Typography } from "@/core/components/base";
import { useStyles } from "@/core/styled";
import { css } from "@emotion/css";
import { Select as BaseSelect, SelectProps } from "antd";
import { OptGroup, Option } from "rc-select";
import { FC } from "react";

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
  const { styles } = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, className, ...otherProps } = props;

  return (
    <Flex className={styles.formContainer}>
      {label && <Typography className={styles.formTitle}>{label}</Typography>}
      <BaseSelect
        className={css`
          width: 100%;
        `}
        {...otherProps}
      />
    </Flex>
  );
};

Select.Option = Option;
Select.OptGroup = OptGroup;
