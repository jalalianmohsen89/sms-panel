import {
  Col,
  Empty,
  Pagination,
  Row,
  useBreakpoint,
} from "@/core/components/base";
import apiService from "@/core/services";
import { useStore } from "@/core/store";
import { theme as themeContent } from "@/core/theme";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  ...props
}: Props<T>) => {
  // -------------------- variables --------------------------
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [selectionKey, setSelectionKey] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { addRecordToDevList } = useStore();

  const [paginationData, setPaginationData] = useState<IPagination>({
    page: 1,
    current: 1,
    pageSize: 15,
  });
  // const [sort, setSort] = useState<ISortInfo>({
  //   sort_direction: "ascend",
  //   sort_field: ""
  // });
  const [params, setParams] = useState<IParams>(
    withPagination ? { page: 1, limit: 15 } : {},
  );
  const breakpoints = useBreakpoint();
  const isMobile = !breakpoints.md;
  const { token } = themeContent.useToken();
  const location = useLocation();
  // const { addRecordToDevList } = useDevToolsContext();
  const {
    dataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scroll,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rowSelection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pagination,
    ...otherProps
  } = props;

  const onChangeCheckbox = (item: any[], checked: boolean, index: string) => {
    let keys = [...selectionKey];
    let rows = [...selectedRow];

    if (checked) {
      keys = [...selectionKey, index];
      rows = [...selectedRow, item];
      setSelectionKey(keys);
      setSelectedRow(rows);
    } else {
      keys = selectionKey.filter((key) => key !== index);
      // حذف آیتم با استفاده از findIndex برای پیدا کردن شاخص دقیق آیتم
      rows = selectedRow.filter(
        (_, idx) =>
          idx !==
          selectedRow.findIndex((row: any) =>
            Object.keys(row).every(
              (key: string) => (row as any)[key] === (item as any)[key],
            ),
          ),
      );

      setSelectionKey(keys);
      setSelectedRow(rows);
    }

    if (onSelected) onSelected(rows, keys);
  };

  const mobileColumns =
    rows?.length > 0 ? (
      <>
        {rows.map((row: any, index) => (
          <MobileTablesCard
            token={token}
            columns={props.columns}
            row={row}
            selection={selection || false}
            selectionKey={selectionKey}
            expandable={props.expandable}
            index={index}
            key={index}
            onChangeCheckbox={onChangeCheckbox}
          />
        ))}
        {withPagination && (
          <Pagination
            current={paginationData.page}
            pageSize={paginationData.pageSize}
            total={paginationData?.total}
            onChange={(page, pageSize) => {
              setParams({
                ...params,
                page,
                limit: pageSize,
              });
              setPaginationData({
                page,
                current: page,
                pageSize,
                total: paginationData?.total,
              });
            }}
          />
        )}
      </>
    ) : (
      <Empty />
    );

  const rowSelectionRow = {
    selectedRowKeys: selectionKey,
    onChange: (selectedRowKeys: any[], data: any[]) => {
      setSelectionKey(selectedRowKeys);
      setSelectedRow(data);
      if (onSelected) {
        onSelected(data, selectedRowKeys);
      }
    },
  };

  // -------------------- methods --------------------------
  const fetchData = () =>
    apiService.get(apiPath, { params: skipUrlParams ? false : params });

  const featuresMobileColumns = () => (
    <Row gutter={[10, 10]}>
      {searchbar && (
        <Col span={12}>
          <SearchbarTable
            isMobile
            text={searchValue}
            setSearchText={setSearchValue}
            // onPressEnter={() => console.log("press")}
          />
        </Col>
      )}
      {sortInfo && (
        <Col span={8}>
          <MobileTableSort
            columns={props.columns}
            params={params}
            setParams={setParams}
            token={token}
            onChangeSortMobile={onChangeSortMobile}
            refreshData={getData}
          />
        </Col>
      )}
      {selection && <Col span={12}>{selectionRows()}</Col>}
    </Row>
  );

  const selectionRows = () => (
    <MobileTableSelection
      selectionKey={selectionKey}
      setSelectionKey={setSelectionKey}
      setSelectedRow={setSelectedRow}
      rows={rows}
    />
  );

  const onChangeTable = (pagination: any) => {
    if (withPagination && pagination?.current) {
      setParams({
        ...params,
        page: pagination?.current,
        limit: +pagination?.pageSize,
      });
      setPaginationData({
        page: +pagination?.current,
        current: +pagination?.current,
        pageSize: +pagination?.pageSize,
        total: pagination?.total,
      });
    }
  };

  // ---------------------- mutation ---------------------
  const { mutate: getData, isPending: loading } = useMutation({
    mutationFn: fetchData,
    onSuccess: ({ data }) => {
      if (withPagination) {
        setPaginationData({
          page: +data.pagination.page,
          current: +data.pagination.page,
          pageSize: +data.pagination.limit,
          total: data.pagination.total,
        });
        // setRows(
        //   dataMap?.(data).filter(
        //     (_item: any, index: number) =>
        //       index >= paginationData.limit * (paginationData.page - 1) &&
        //       index < paginationData.limit * paginationData.page
        //   )
        // );
      }
      if (showRowNumber) {
        setRows(
          dataMap?.(data).map((item: any, index: number) => {
            item.index =
              paginationData.pageSize * ((paginationData.current || 1) - 1) +
              index +
              1;

            return item;
          }),
        );
      } else {
        setRows(dataMap?.(data));
      }

      onGetData?.(data);
      addRecordToDevList(
        {
          name: "getData",
          url: location.pathname,
          params: "",
          list: data,
        },
        location,
      );
    },
  });

  // -------------------- useEffect --------------------------
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // تبدیل پارامترهای کوئری به یک شیء
    let paramsObject = Object.fromEntries(queryParams.entries()) as any;

    const pagination = {
      page: paginationData.page,
      limit: paginationData.pageSize,
    };

    if (withPagination) {
      paramsObject = {
        ...pagination,
        ...paramsObject,
      };
    }
    setParams({
      ...paramsObject,
    });

    return () => {
      paramsObject = undefined;
      setParams({});
    };
  }, [location.search]);

  useEffect(() => {
    if (dataMap) {
      if (!requiredFilter) {
        getData();
      } else if (requiredFilter && Object.keys(params).length > 2) {
        getData();
      }
    }
  }, [params, requiredFilter]);

  useEffect(() => {
    if (dataMap && refeatch) {
      getData();
    }
  }, [refeatch]);

  useEffect(() => {
    const firstColumn = {
      title: "ردیف ",
      dataIndex: "index",
      key: "index",
    };
    const find = props.columns.find((item: any) => item.key === "index");

    if (!find) {
      props.columns.unshift(firstColumn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationData]);

  // useEffect(() => {
  //   if (sortInfo) {
  //     setParams({
  //       ...params,
  //       sort: {
  //         order: sortInfo.order,
  //         columnKey: sortInfo.columnKey || ""
  //       }
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sortInfo]);

  useEffect(() => {
    if (dataSource)
      setRows(
        dataSource.map((row, index) => ({ ...row, key: row?.id || index })),
      );

    return () => {
      setRows([]);
    };
  }, [dataSource]);

  return {
    loading,
    isMobile,
    mobileColumns,
    rows,
    rowSelectionRow,
    searchValue,
    setSearchValue,
    paginationData,
    otherProps,
    featuresMobileColumns,
    onChangeTable,
  };
};

export default useDataTable;
