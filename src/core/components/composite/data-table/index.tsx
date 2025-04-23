import { Flex, Table } from "@/core/components/base";
import type { TableProps } from "@/core/components/base";
import { Key } from "react";
import useDataTable from "./UseDataTable";
import { theme as themeContent } from "@/core/theme";
import { Section } from "@/core/styled";
import { css } from "@emotion/css";
import { ISortInfo } from "./types";
import { RenderSkeleton, SearchbarTable } from "./components";

// Keep the original Props type definition
export type Props<T extends object> = TableProps<T> & {
  apiPath: string;
  selection?: boolean;
  sortInfo?: ISortInfo;
  searchbar?: boolean;
  withPagination?: boolean;
  rowKey?: string;
  refeatch?: boolean;
  skipUrlParams?: boolean;
  showRowNumber?: boolean;
  requiredFilter?: boolean;
  dataMap?: (value: any) => any;
  onSelected?: (data: any[], keys: Key[]) => void;
  onGetData?: (data: any[]) => void;
  onChangeSortMobile?: (
    order: "ascend" | "descend" | null,
    columnKey: string,
  ) => void;
};

export const DataTable = <T extends object>({
  // Use the original Props type
  apiPath,
  selection,
  sortInfo,
  searchbar,
  withPagination = true,
  rowKey = "id",
  refeatch,
  skipUrlParams,
  showRowNumber = true,
  requiredFilter,
  dataMap,
  onSelected,
  onGetData,
  onChangeSortMobile,
  columns: initialColumns, // Receive initialColumns
  ...props // Spread the rest of the original TableProps
}: Props<T>) => {
  // -------------------- variables --------------------------
  const { token } = themeContent.useToken();

  // -------------------- hook --------------------------
  const {
    loading,
    isMobile,
    mobileColumns, // Use the renamed mobileTableContent from the hook
    rows,
    columns, // Use the memoized columns from the hook
    searchValue,
    setSearchValue,
    otherProps, // Use the correctly destructured otherProps
    featuresMobileColumns,
    onChangeTable,
    tableProps, // Use the calculated tableProps for pagination and selection
  } = useDataTable<T>({
    // Pass the generic type T
    apiPath,
    selection,
    sortInfo,
    searchbar,
    withPagination,
    refeatch,
    skipUrlParams,
    showRowNumber,
    requiredFilter,
    dataMap,
    onSelected,
    onGetData,
    onChangeSortMobile,
    columns: initialColumns, // Pass initialColumns to the hook
    ...props, // Pass the rest of the original TableProps to the hook
  });

  return loading ? (
    <RenderSkeleton columns={columns} /> // Use columns from the hook
  ) : (
    <>
      {isMobile ? (
        <Section token={token}>
          <Flex
            className={css`
              width: 100%;
              margin-bottom: 10px;
            `}
          >
            {featuresMobileColumns}
          </Flex>
          <Flex
            className={css`
              width: 100%;
              flex-direction: column;
            `}
          >
            {mobileColumns}
          </Flex>
        </Section>
      ) : (
        <Section token={token}>
          <Flex vertical style={{ gap: 20 }}>
            {searchbar && (
              <SearchbarTable
                text={searchValue}
                setSearchText={setSearchValue}
              />
            )}
            <Table<T> // Ensure Table component receives the correct generic type
              rowKey={rowKey}
              dataSource={rows}
              columns={columns} // Use columns from the hook
              scroll={{ x: "100%", ...props.scroll }} // Merge scroll props if needed
              loading={loading} // Pass loading state
              onChange={onChangeTable} // Pass onChange handler
              {...tableProps} // Spread pagination and rowSelection from tableProps
              {...otherProps} // Spread the rest of the AntD table props
            />
          </Flex>
        </Section>
      )}
    </>
  );
};
