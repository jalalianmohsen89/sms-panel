import { FC } from "react";
import { DatePickerProps } from "antd";
import { DatePicker } from "antd-jalali";
import dayjs from "@/core/functions/dayjs";
import { theme as themeContent } from "@/core/theme";
import { FormContainer, FormTitle } from "@/core/styled";
import { icons, locale } from "./content";

type Props = DatePickerProps & {
  label?: string;
  value?: [dayjs.Dayjs, dayjs.Dayjs] | [string, string] | [Date, Date] | null;
  defaultValue?:
    | [dayjs.Dayjs, dayjs.Dayjs]
    | [string, string]
    | [Date, Date]
    | null;
  onChange?: (
    date: { date1: Date; date2: Date },
    dateString: [string, string],
  ) => void;
};

export const RangePickerJalali: FC<Props> = ({
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

  const handleChange = (
    dates: [dayjs.Dayjs, dayjs.Dayjs] | null,
    dateStrings: [string, string],
  ) => {
    if (onChange && dates) {
      onChange(
        {
          date1: dates[0].toDate(),
          date2: dates[1].toDate(),
        },
        dateStrings,
      );
    }
  };

  // تبدیل مقدار اولیه و مقدار فعلی به dayjs
  const getDayjsValue = (
    value: any,
  ): [dayjs.Dayjs, dayjs.Dayjs] | undefined => {
    if (!value || !Array.isArray(value) || value.length !== 2) return undefined;

    return [dayjs(value[0]), dayjs(value[1])];
  };

  return (
    <FormContainer>
      <FormTitle token={token}>{label}</FormTitle>
      <DatePicker.RangePicker
        {...rest}
        {...icons}
        className={`${className || ""}`}
        value={getDayjsValue(value)}
        defaultValue={getDayjsValue(defaultValue)}
        onChange={handleChange}
        format={showTime ? `HH:mm ${format}` : format}
        placeholder={placeholder}
        locale={locale}
        showTime={showTime}
      />
    </FormContainer>
  );
};
