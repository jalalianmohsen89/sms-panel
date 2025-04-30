import type { Props as TableProps } from "@/core/components/base/table";
import { Flex } from "@/core/components/base/flex";
import { Table } from "@/core/components/base/table";
import { useStyles as useStylesBase } from "@/core/styled";
import { Key } from "react";
import { RenderSkeleton, SearchbarTable } from "./components";
import { useStyles } from "./styled";
import { ISortInfo } from "./types";
import { useDataTable } from "./UseDataTable";

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

const DataTable = <T extends object>({
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
  const { styles: stylesBase } = useStylesBase();
  const { styles } = useStyles();

  // -------------------- hook --------------------------
  const {
    loading,
    isMobile,
    mobileColumns, // Use the renamed mobileTableContent from the hook
    rows,
    columns, // Use the memoized columns from the hook
    searchValue,
    setSearchValue,
    featuresMobileColumns,
    onChangeTable,
    otherProps, // Use the correctly destructured otherProps
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
        <section className={stylesBase.section}>
          <Flex className={styles.featuresMobileColumnsContainer}>
            {featuresMobileColumns}
          </Flex>
          <Flex className={styles.mobileColumnsContainer}>{mobileColumns}</Flex>
        </section>
      ) : (
        <section className={stylesBase.section}>
          <Flex vertical style={{ gap: 20 }}>
            {searchbar && (
              <SearchbarTable
                text={searchValue}
                setSearchText={setSearchValue}
              />
            )}
            <Table
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
        </section>
      )}
    </>
  );
};

export default DataTable;
