import { FC } from "react";
import { DatePickerProps } from "antd";
import { DatePicker } from "antd-jalali";
import dayjs from "@/core/functions/dayjs";
import { theme as themeContent } from "@/core/theme";
import { FormContainer, FormTitle } from "@/core/styled";
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
  const { token } = themeContent.useToken();
  const handleChange = (date: any, dateString: string) => {
    if (onChange) {
      onChange(new Date(date), dateString);
    }
  };

  return (
    <FormContainer>
      <FormTitle token={token}>{label}</FormTitle>
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
    </FormContainer>
  );
};
