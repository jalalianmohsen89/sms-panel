import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useTransition,
} from "react";
import { useSearchParams } from "react-router-dom";
import { IPageBuilderFilter } from "@/core/types/page-builder";
import FilterItem from "./FilterItem";
import { Col } from "@/core/components/base/col";

type Props = {
  list: IPageBuilderFilter[];
};
export const usePageBuilderFilterHook = (props: Props) => {
  // -------------------- variables ----------------------
  const [params, setParams] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition(); // Add useTransition

  // -------------------- methods ----------------------
  const filterQueryParams = useCallback(
    () =>
      Object.fromEntries(
        Object.entries(params).filter(
          ([, value]) => value !== undefined && value !== null && value !== "",
        ),
      ),
    [params],
  ); // Wrap with useCallback

  const sendParams = useCallback(() => {
    const filteredParams = filterQueryParams();
    const queryString = new URLSearchParams(filteredParams as any).toString();

    startTransition(() => {
      // Wrap setSearchParams with startTransition
      setSearchParams(queryString);
    });
    // props.onSend();
  }, [filterQueryParams, setSearchParams, startTransition]);
  // Wrap with useCallback and add dependencies

  const checkFilters = useMemo(
    () =>
      props.list
        .sort((a: any, b: any) => a.sort - b.sort)
        .map((item: IPageBuilderFilter) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { onChangeValue, dependenValue, ...itemProps } = item;
          // Renamed props to avoid conflict
          const sizes = itemProps.size.split(",");

          return (
            <Col
              xs={+sizes[0]}
              md={+sizes[1]}
              lg={+sizes[2]}
              xl={+sizes[3] || +sizes[2]}
              xxl={+sizes[4] || +sizes[3] || +sizes[2]}
              key={item.field}
            >
              <FilterItem
                {...itemProps} // Use renamed props
                dependenValue={params[itemProps.dependenOn as string]}
                onChangeValue={(value, field) => {
                  setParams((prev: any) => ({
                    ...prev,
                    [field]: value?.value ?? value,
                  }));
                }}
              />
            </Col>
          );
        }),
    [props.list, params],
  ); // Wrap with useMemo and add dependencies

  // -------------------- useEffects ----------------------

  useEffect(() => {
    // Initialize params from searchParams and defaultValues on mount/list change
    const initialParamsFromSearch = Object.fromEntries(searchParams);
    let initParam = { ...initialParamsFromSearch }; // Start with current search params

    props.list.forEach((item: IPageBuilderFilter) => {
      // Apply default value only if not already present in searchParams
      if (item.defaultValue && !(item.field in initialParamsFromSearch)) {
        initParam = { ...initParam, [item.field]: item.defaultValue };
      }
    });

    // Update local state 'params' based on initial values
    setParams(initParam);

    // Update URL search params if necessary (e.g., adding default values)
    const currentQueryString = new URLSearchParams(
      initialParamsFromSearch as any,
    ).toString();
    const newQueryString = new URLSearchParams(initParam as any).toString();

    if (currentQueryString !== newQueryString) {
      startTransition(() => {
        // Use transition for URL update
        setSearchParams(newQueryString);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.list, searchParams, setSearchParams]); // Adjusted dependencies

  return {
    sendParams,
    checkFilters,
    isPending, // Return isPending if needed by the consuming component
  };
};
