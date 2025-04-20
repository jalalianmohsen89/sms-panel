import apiService from "@/core/services";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  DatePickerJalali,
  RangePickerJalali,
  Input,
  Select,
  Switch,
} from "@/core/components/base";
import { css } from "@emotion/css";
import { IPageBuilderFilter, TYPES } from "../types";
import { useSearchParams } from "react-router-dom";

type Props = IPageBuilderFilter;
const useFilterHook = (props: Props) => {
  // -------------------- variables ----------------------
  const [apiUrl, setApiUrl] = useState(props.apiUrl);
  const [value, setValue] = useState<any>(props.defaultValue);
  const [multipleValue, setMultipleValue] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  // -------------------- methods --------------------------
  const fetchData = () => apiService.get(apiUrl ?? "");

  const inputType = () => (
    <Input
      label={props.title}
      value={value}
      onInput={(event) => {
        setValue((event.target as HTMLInputElement).value);
        props.onChangeValue?.(
          (event.target as HTMLInputElement).value,
          props.field,
        );
      }}
    />
  );
  const selectType = () => (
    <Select
      label={props.title}
      optionFilterProp="label"
      showSearch
      allowClear
      options={options}
      value={value}
      onChange={(value, dataList) => {
        setValue(value);
        props.onChangeValue?.(dataList, props.field);
      }}
    />
  );

  const multiSelectType = () => (
    <Select
      label={props.title}
      mode="multiple"
      optionFilterProp="label"
      showSearch
      allowClear
      placeholder={props.title}
      options={options}
      value={multipleValue}
      maxTagCount="responsive"
      onChange={(value, dataList) => {
        setMultipleValue([...value]);
        props.onChangeValue?.(dataList, props.field);
      }}
    />
  );

  const switchType = () => (
    <Switch
      label={props.title}
      checkedChildren={props.title}
      checked={value}
      value={value}
      onChange={(value) => {
        setValue(value);
        props.onChangeValue?.(value, props.field);
      }}
    />
  );

  const datePickerType = () => (
    <DatePickerJalali
      className={css`
        width: 100%;
      `}
      showTime={props.showTime}
      label={props.title}
      placeholder={props.title}
      defaultValue={props.defaultValue}
      onChange={(date) => props.onChangeValue?.(date, props.field)}
    />
  );

  const dateRangeType = () => (
    <RangePickerJalali
      className={css`
        width: 100%;
      `}
      label={props.title}
      showTime={props.showTime}
      placeholder={props.title}
      defaultValue={props.defaultValue}
      onChange={(_event, date) =>
        props.onChangeValue?.([date[0], date[1]], props.field)
      }
    />
  );

  const checkFilter = () => {
    switch (props.type) {
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
  };

  // ---------------------- hooks ---------------------
  const { mutate: getData } = useMutation({
    mutationFn: fetchData,
    onSuccess: ({ data }) => {
      setOptions(props.mapper?.(data) ?? data);
    },
  });

  // ---------------------- useEffects ---------------------
  useEffect(() => {
    if (apiUrl) {
      getData();
    }
  }, [getData, apiUrl]);

  useEffect(() => {
    if (props.data) {
      setOptions(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (props.dependenValue && props.dependenOn) {
      setApiUrl(props.apiUrl + `?${props.dependenOn}=${props.dependenValue}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dependenValue, props.dependenOn]);

  useEffect(() => {
    if (props.defaultValue) {
      props.onChangeValue?.(props.defaultValue, props.field);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValue]);

  useEffect(() => {
    const param = Object.fromEntries(searchParams);

    if (param && param[props.field]) {
      setValue(param[props.field]);
      props.onChangeValue?.(param[props.field], props.field);
    }
  }, [searchParams]);

  return { checkFilter };
};

export default useFilterHook;
