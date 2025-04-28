import apiService from "@/core/services";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useCallback, useMemo } from "react";
import { RangePickerJalali } from "@/core/components/base/date-picker/RangePicker";
import { DatePickerJalali } from "@/core/components/base/date-picker";
import { Input } from "@/core/components/base/input";
import { Select } from "@/core/components/base/select";
import { Switch } from "@/core/components/base/switch";
import { IPageBuilderFilter, TYPES, ISelect } from "../types";
import { useSearchParams } from "react-router-dom";
import { useStyles } from "./styled";

type Props = IPageBuilderFilter;
const useFilterHook = (props: Props) => {
  // -------------------- variables ----------------------
  const {
    onChangeValue,
    field,
    title,
    defaultValue,
    showTime,
    mapper,
    data,
    dependenOn,
    dependenValue,
    apiUrl: propApiUrl,
    type,
  } = props;

  const [apiUrl, setApiUrl] = useState(propApiUrl);
  const [value, setValue] = useState<any>(defaultValue);
  const [multipleValue, setMultipleValue] = useState<any[]>(defaultValue || []);
  const [options, setOptions] = useState<ISelect[]>([]);
  const [searchParams] = useSearchParams();
  const { styles } = useStyles();

  const fetchData = useCallback(() => apiService.get(apiUrl ?? ""), [apiUrl]);

  // -------------------- mutations ------------------------
  const { mutate: gateData, isPending } = useMutation({
    mutationFn: fetchData,
    onSuccess: ({ data }) => {
      setOptions(mapper?.(data) ?? data);
    },
  });

  // -------------------- methods --------------------------
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setValue(newValue);
      onChangeValue?.(newValue, field);
    },
    [onChangeValue, field],
  );

  const handleSelectChange = useCallback(
    (newValue: any, dataList: any) => {
      setValue(newValue);
      onChangeValue?.(dataList, field);
    },
    [onChangeValue, field],
  );

  const handleMultiSelectChange = useCallback(
    (newValue: any[], dataList: any) => {
      setMultipleValue(newValue);
      onChangeValue?.(dataList, field);
    },
    [onChangeValue, field],
  );

  const handleSwitchChange = useCallback(
    (newValue: boolean) => {
      setValue(newValue);
      onChangeValue?.(newValue, field);
    },
    [onChangeValue, field],
  );

  const handleDatePickerChange = useCallback(
    (date: any) => {
      // Assuming date is the value needed
      setValue(date); // Update local state if needed
      onChangeValue?.(date, field);
    },
    [onChangeValue, field],
  );

  const handleDateRangeChange = useCallback(
    (_event: any, date: [string, string]) => {
      // Assuming date array is the value needed
      setValue(date); // Update local state if needed
      onChangeValue?.(date, field);
    },
    [onChangeValue, field],
  );

  // -------------------- components -----------------------
  const inputType = useCallback(
    () => <Input label={title} value={value} onInput={handleInputChange} />,
    [title, value, handleInputChange],
  );

  const selectType = useCallback(
    () => (
      <Select
        label={title}
        optionFilterProp="label"
        showSearch
        allowClear
        loading={isPending}
        options={options}
        value={value}
        onChange={handleSelectChange}
      />
    ),
    [title, options, value, handleSelectChange, isPending],
  );

  const multiSelectType = useCallback(
    () => (
      <Select
        label={title}
        mode="multiple"
        optionFilterProp="label"
        showSearch
        allowClear
        loading={isPending}
        placeholder={title}
        options={options}
        value={multipleValue}
        maxTagCount="responsive"
        onChange={handleMultiSelectChange}
      />
    ),
    [title, options, multipleValue, handleMultiSelectChange, isPending],
  );

  const switchType = useCallback(
    () => (
      <Switch
        label={title}
        checkedChildren={title}
        checked={value}
        value={value}
        onChange={handleSwitchChange}
      />
    ),
    [title, value, handleSwitchChange],
  );

  const datePickerType = useCallback(
    () => (
      <DatePickerJalali
        className={styles.width}
        showTime={showTime}
        label={title}
        placeholder={title}
        value={value} // Use controlled value
        onChange={handleDatePickerChange}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTime, title, value, handleDatePickerChange],
  );

  const dateRangeType = useCallback(
    () => (
      <RangePickerJalali
        className={styles.width}
        label={title}
        showTime={showTime}
        placeholder={title}
        value={value} // Use controlled value
        onChange={(date, dateString) =>
          handleDateRangeChange(date, dateString as [string, string])
        }
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, showTime, value, handleDateRangeChange],
  );

  const checkFilter = useMemo(() => {
    switch (type) {
    case TYPES.INPUT:
      return inputType();
    case TYPES.SELECT:
      return selectType();
    case TYPES.MULTI_SELECT:
      return multiSelectType();
    case TYPES.SWITCH:
      return switchType();
    case TYPES.DATE_PICKER:
      return datePickerType();
    case TYPES.DATE_RANGE:
      return dateRangeType();
    default:
      return inputType();
    }
  }, [
    type,
    inputType,
    selectType,
    multiSelectType,
    switchType,
    datePickerType,
    dateRangeType,
  ]);

  // -------------------- useEffects -----------------------
  useEffect(() => {
    if (data) {
      setOptions(data);
    }
  }, [data]);

  useEffect(() => {
    if (apiUrl && !data) {
      gateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, data]); // Removed mutate from dependency array

  useEffect(() => {
    if (dependenValue && dependenOn) {
      setApiUrl(apiUrl + `?${dependenOn}=${dependenValue}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependenValue, dependenOn]);

  // Reset value when options change and current value is no longer valid
  useEffect(() => {
    if (defaultValue) {
      onChangeValue?.(defaultValue, field);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    const param = Object.fromEntries(searchParams);

    if (param && param[field]) {
      setValue(param[field]);
      onChangeValue?.(param[field], field);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    checkFilter,
    isPending,
    options,
    value,
    multipleValue,
  };
};

export default useFilterHook;
