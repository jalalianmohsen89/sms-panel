import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import { useStyles } from "@/core/styled";
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
  const { styles } = useStyles();
  const { label, ...otherProps } = props;

  return (
    <Flex className={styles.formContainer}>
      {label && <Typography className={styles.formTitle}>{label}</Typography>}
      <TextAreaBase {...otherProps} />
    </Flex>
  );
};
