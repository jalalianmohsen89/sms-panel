import {
  Col,
  Empty,
  Pagination,
  Row,
  useBreakpoint,
} from "@/core/components/base";
import apiService from "@/core/services";
import { useStore } from "@/core/store";
import { css } from "@emotion/css";
import { useMutation } from "@tanstack/react-query";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useLocation } from "react-router-dom";
import {
  MobileTablesCard,
  MobileTableSelection,
  MobileTableSort,
  SearchbarTable,
} from "./components";
import { Props } from "./index";
import { IPagination, IParams } from "./types";

interface WithOptionalId {
  id?: string | number;
}

const DEFAULT_PAGE_SIZE = 15;

const useDataTable = <T extends WithOptionalId>({
  apiPath,
  selection,
  sortInfo,
  searchbar,
  withPagination,
  refeatch,
  skipUrlParams,
  requiredFilter,
  showRowNumber,
  dataMap,
  onSelected,
  onGetData,
  onChangeSortMobile,
  columns: initialColumns, // Rename prop to avoid conflict
  dataSource,
  ...props
}: Props<T>) => {
  // -------------------- State --------------------------
  const [rows, setRows] = useState<any[]>([]);
  const [, setSelectedRow] = useState<any[]>([]);
  const [selectionKey, setSelectionKey] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchValue = useDeferredValue(searchValue);
  const [isPendingTransition, startTransition] = useTransition();
  const { addRecordToDevList } = useStore();

  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });

  const [params, setParams] = useState<IParams>(() => {
    const initialParams: IParams = {};

    if (withPagination) {
      initialParams.page = 1;
      initialParams.limit = DEFAULT_PAGE_SIZE;
    }

    return initialParams;
  });

  // -------------------- Hooks --------------------------
  const breakpoints = useBreakpoint();
  const isMobile = !breakpoints.md;
  const location = useLocation();

  // Destructure other props safely
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scroll,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rowSelection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pagination: tablePagination,
    ...otherProps
  } = props;

  // -------------------- Callbacks & Memos --------------------------

  // Memoize columns to prevent unnecessary re-renders, add row number column if needed
  const columns = useMemo(() => {
    if (showRowNumber) {
      const hasIndexColumn = initialColumns.some(
        (item: any) => item.key === "index",
      );
      const indexColumn = {
        title: "ردیف ",
        dataIndex: "index",
        key: "index",
      };

      return hasIndexColumn ? initialColumns : [indexColumn, ...initialColumns];
    }

    return initialColumns;
  }, [initialColumns, showRowNumber]);

  // Callback for handling checkbox changes in mobile view
  const onChangeCheckbox = useCallback(
    (item: any, checked: boolean, index: string) => {
      setSelectionKey((prevKeys) => {
        const newKeys = checked
          ? [...prevKeys, index]
          : prevKeys.filter((key) => key !== index);

        setSelectedRow((prevRows) => {
          const newRows = checked
            ? [...prevRows, item]
            : prevRows.filter((row) => row.key !== item.key); // Assuming item has a unique key

          if (onSelected) onSelected(newRows, newKeys);

          return newRows;
        });

        return newKeys;
      });
    },
    [onSelected],
  );

  // Callback for handling row selection changes in desktop view
  const handleRowSelectionChange = useCallback(
    (selectedRowKeys: any[], data: any[]) => {
      setSelectionKey(selectedRowKeys);
      setSelectedRow(data);
      if (onSelected) {
        onSelected(data, selectedRowKeys);
      }
    },
    [onSelected],
  );

  // Centralized function to update pagination and params
  const handlePaginationChange = useCallback(
    (page: number, pageSize?: number) => {
      const newPageSize = pageSize ?? pagination.pageSize;

      startTransition(() => {
        setParams((prevParams) => ({
          ...prevParams,
          page,
          limit: newPageSize,
        }));
        // Update pagination state separately ONLY IF NEEDED by the UI component directly
        // setPagination(prev => ({ ...prev, page, current: page, pageSize: newPageSize }));
      });
    },
    [pagination.pageSize],
  );

  // Callback for Ant Design Table's onChange event
  const onChangeTable = useCallback(
    (tablePagination: any, filters: any, sorter: any) => {
      // Handle pagination
      if (
        withPagination &&
        tablePagination?.current &&
        (tablePagination.current !== params.page ||
          tablePagination.pageSize !== params.limit)
      ) {
        handlePaginationChange(
          tablePagination.current,
          tablePagination.pageSize,
        );
      }

      // Handle sorting (example, adjust based on your sorter structure)
      if (sorter && sorter.field && sorter.order) {
        setParams((prevParams) => ({
          ...prevParams,
          sort_field: sorter.field,
          sort_direction: sorter.order, // 'ascend' | 'descend'
        }));
      }
      // Handle filtering (example)
      // if (filters) { ... }
    },
    [withPagination, handlePaginationChange, params.page, params.limit],
  );

  // -------------------- Data Fetching --------------------------
  const fetchData = useCallback(() => {
    // Construct final params, including search
    const finalParams = { ...params };

    if (deferredSearchValue) {
      finalParams.search = deferredSearchValue;
    }
    // Remove pagination params if not needed
    if (!withPagination) {
      delete finalParams.page;
      delete finalParams.limit;
    }

    return apiService.get(apiPath, {
      params: skipUrlParams ? undefined : finalParams,
    });
  }, [apiPath, params, skipUrlParams, deferredSearchValue, withPagination]);

  const { mutate: getData, isPending: loadingMutation } = useMutation({
    mutationFn: fetchData,
    onSuccess: ({ data }) => {
      startTransition(() => {
        let processedRows = dataMap
          ? dataMap(data.list || data)
          : data.list || data;

        if (withPagination && data.pagination) {
          setPagination({
            page: +data.pagination.page,
            current: +data.pagination.page,
            pageSize: +data.pagination.limit,
            total: data.pagination.total,
          });
        }

        if (showRowNumber) {
          const currentPage = params.page ?? 1;
          const currentLimit = params.limit ?? DEFAULT_PAGE_SIZE;

          processedRows = processedRows?.map((item: any, index: number) => ({
            ...item,
            index: currentLimit * (currentPage - 1) + index + 1,
            key: item.id ?? index, // Ensure unique key for React
          }));
        } else {
          processedRows = processedRows.map((item: any, index: number) => ({
            ...item,
            key: item.id ?? index, // Ensure unique key for React
          }));
        }

        setRows(processedRows);
        onGetData?.(data);
        addRecordToDevList(
          {
            name: "getData",
            url: location.pathname,
            params: JSON.stringify(params), // Log current params
            list: data,
          },
          location,
        );
      });
    },
    // onError: (error) => {
    //   console.error("Error fetching data:", error);
    //   // Handle error appropriately, e.g., show a toast message
    // }
  });

  // -------------------- Effects --------------------------

  // Effect to update params from URL search query on initial load or location change
  useEffect(() => {
    if (skipUrlParams) return;

    const queryParams = new URLSearchParams(location.search);
    const paramsFromUrl = Object.fromEntries(queryParams.entries());

    // Merge URL params with existing params, prioritizing URL
    setParams((prevParams) => {
      const newParams = { ...prevParams } as any;

      if (withPagination) {
        newParams.page =
          parseInt(paramsFromUrl.page, 10) || prevParams.page || 1;
        newParams.limit =
          parseInt(paramsFromUrl.limit, 10) ||
          prevParams.limit ||
          DEFAULT_PAGE_SIZE;
      }

      // Merge other params from URL
      Object.keys(paramsFromUrl).forEach((key) => {
        if (key !== "page" && key !== "limit") {
          newParams[key] = paramsFromUrl[key];
        }
      });

      return newParams;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, skipUrlParams, withPagination]); // Only run when search query changes

  // Effect to fetch data when params change (debounced by deferredSearchValue)
  useEffect(() => {
    // Ensure dataMap is provided before fetching
    if (!dataMap) return;

    const shouldFetch =
      !requiredFilter ||
      (requiredFilter &&
        Object.keys(params).some((k) => k !== "page" && k !== "limit"));

    if (shouldFetch) {
      // Check if essential params are present before fetching
      if (
        withPagination &&
        (params.page === undefined || params.limit === undefined)
      ) {
        return;
      }
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params,
    requiredFilter,
    deferredSearchValue,
    dataMap,
    getData,
    withPagination,
  ]); // getData is memoized by useMutation

  // Effect to refetch data when `refeatch` prop changes
  useEffect(() => {
    if (dataMap && refeatch) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refeatch, dataMap, getData]);

  // Effect to handle externally provided dataSource
  useEffect(() => {
    if (dataSource) {
      startTransition(() => {
        setRows(
          dataSource.map((row, index) => ({ ...row, key: row?.id ?? index })),
        );
      });
    }
    // Don't reset rows here if dataSource becomes undefined, might conflict with API data
    // return () => {
    //   if (!apiPath) setRows([]); // Only clear if it's purely dataSource driven
    // };
  }, [dataSource]);

  // -------------------- Render Logic for Mobile --------------------------
  const mobileTableContent = useMemo(
    () =>
      rows?.length > 0 ? (
        <>
          {rows.map((row: any, index) => (
            <MobileTablesCard
              columns={columns} // Use memoized columns
              row={row}
              selection={selection || false}
              selectionKey={selectionKey}
              expandable={props.expandable}
              index={row.index ?? index} // Use calculated index if available
              key={row.key} // Use unique key
              onChangeCheckbox={onChangeCheckbox}
            />
          ))}
          {withPagination && (pagination.total ?? 0) > 0 && (
            <Pagination
              current={params.page} // Use params.page for current
              pageSize={params.limit} // Use params.limit for pageSize
              total={pagination.total}
              onChange={handlePaginationChange} // Use centralized handler
              showSizeChanger
            />
          )}
        </>
      ) : (
        <Empty />
      ),
    [
      rows,
      columns,
      selection,
      selectionKey,
      props.expandable,
      onChangeCheckbox,
      withPagination,
      pagination.total,
      params.page,
      params.limit,
      handlePaginationChange,
    ],
  );

  const featuresMobileColumns = useMemo(
    () => (
      <Row
        gutter={[10, 10]}
        className={css`
          width: 100%;
        `}
      >
        {searchbar && (
          <Col span={isMobile ? 24 : 12} lg={8}>
            <SearchbarTable
              isMobile={isMobile}
              text={searchValue}
              setSearchText={setSearchValue}
            />
          </Col>
        )}
        {sortInfo && (
          <Col span={isMobile ? 12 : 8} lg={6}>
            <MobileTableSort
              columns={columns} // Use memoized columns
              params={params}
              setParams={setParams} // Allow direct setting for sort if needed
              onChangeSortMobile={onChangeSortMobile}
              refreshData={getData}
            />
          </Col>
        )}
        {selection && (
          <Col span={isMobile ? 12 : 4} lg={4}>
            <MobileTableSelection
              selectionKey={selectionKey}
              setSelectionKey={setSelectionKey}
              setSelectedRow={setSelectedRow}
              rows={rows}
            />
          </Col>
        )}
      </Row>
    ),
    [
      searchbar,
      isMobile,
      searchValue,
      sortInfo,
      columns,
      params,
      onChangeSortMobile,
      getData,
      selection,
      selectionKey,
      rows,
    ],
  );

  // -------------------- Props for Desktop Table --------------------------
  const tableProps = useMemo(
    () => ({
      ...(selection && {
        rowSelection: {
          selectedRowKeys: selectionKey,
          onChange: handleRowSelectionChange,
        },
      }),
      ...((withPagination
        ? {
          pagination: {
            current: params.page,
            pageSize: params.limit,
            total: pagination.total,
            showSizeChanger: true,
          },
        }
        : { pagination: false }) as any),
    }),
    [
      selection,
      selectionKey,
      handleRowSelectionChange,
      withPagination,
      params.page,
      params.limit,
      pagination.total,
    ],
  );

  // -------------------- Return Value --------------------------
  return {
    loading: loadingMutation || isPendingTransition,
    isMobile,
    mobileColumns: mobileTableContent, // Renamed for clarity
    rows,
    columns, // Return memoized columns
    // rowSelectionRow: tableProps.rowSelection, // Pass selection config directly if needed
    searchValue,
    setSearchValue,
    // paginationData: tableProps.pagination, // Pass pagination config directly if needed
    otherProps, // Pass down remaining props
    featuresMobileColumns, // Pass down mobile features
    onChangeTable, // Pass down table change handler
    tableProps, // Pass down calculated table props (pagination, selection)
    params, // Expose params if needed externally
  };
};

export default useDataTable;
