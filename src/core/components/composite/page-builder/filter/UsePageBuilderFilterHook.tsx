import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPageBuilderFilter } from "../types";
import FilterItem from "./FilterItem";
import { Col } from "@/core/components/base";

type Props = {
  list: IPageBuilderFilter[];
};
const usePageBuilderFilterHook = (props: Props) => {
  // -------------------- variables ----------------------
  const [params, setParams] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();

  // -------------------- methods ----------------------
  const filterQueryParams = () =>
    Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      ),
    );

  const sendParams = () => {
    const filteredParams = filterQueryParams();
    const queryString = new URLSearchParams(filteredParams as any).toString();

    setSearchParams(queryString);
    // props.onSend();
  };

  const checkFilters = () =>
    props.list
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((item: IPageBuilderFilter, index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { onChangeValue, dependenValue, ...props } = item;
        const sizes = props.size.split(",");

        return (
          <Col
            xs={+sizes[0]}
            md={+sizes[1]}
            lg={+sizes[2]}
            xl={+sizes[3] || +sizes[2]}
            xxl={+sizes[4] || +sizes[3] || +sizes[2]}
            key={index}
          >
            <FilterItem
              {...props}
              dependenValue={params[props.dependenOn as string]}
              onChangeValue={(value, field) => {
                setParams((prev: any) => ({
                  ...prev,
                  [field]: value?.value ?? value,
                }));
              }}
            />
          </Col>
        );
      });

  // -------------------- useEffects ----------------------

  useEffect(() => {
    if (props.list.length > 0) {
      let initParam = { ...params };

      props.list.map((item: IPageBuilderFilter) => {
        if (item.defaultValue)
          initParam = { ...initParam, ...{ [item.field]: item.defaultValue } };
      });
      const queryString = new URLSearchParams({
        ...initParam,
        ...Object.fromEntries(searchParams),
      } as any).toString();

      setSearchParams(queryString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.list]);

  return {
    sendParams,
    checkFilters,
  };
};

export default usePageBuilderFilterHook;
