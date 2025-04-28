import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import dayjs from "@/core/functions/dayjs";
import { useStyles } from "@/core/styled";
import { DatePickerProps } from "antd";
import { DatePicker } from "antd-jalali";
import { FC } from "react";
import { icons, locale } from "./content";

type Props = DatePickerProps & {
  label?: string;
  onChange?: (date: any, dateString: string) => void;
};

export const DatePickerJalali: FC<Props> = ({
  label,
  value,
  defaultValue,
  onChange,
  format = "YYYY/MM/DD",
  placeholder = "انتخاب تاریخ",
  className,
  showTime,
  ...rest
}) => {
  const { styles } = useStyles();
  const handleChange = (date: any, dateString: string) => {
    if (onChange) {
      onChange(new Date(date), dateString);
    }
  };

  return (
    <Flex className={styles.formContainer}>
      <Typography className={styles.formTitle}>{label}</Typography>
      <DatePicker
        {...rest}
        {...icons}
        className={` ${className || ""}`}
        value={value ? dayjs(value) : undefined}
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        onChange={handleChange}
        format={
          showTime ? ((" HH:mm " + format) as string) : (format as string)
        }
        placeholder={placeholder}
        locale={locale}
        showTime={showTime}
      />
    </Flex>
  );
};
