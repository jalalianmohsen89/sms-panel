import { Flex, Table } from "@/core/components/base";
import type { TableProps } from "@/core/components/base";
import { Key } from "react";
import useDataTable from "./UseDataTable";
import { theme as themeContent } from "@/core/theme";
import { Section } from "@/core/styled";
import { css } from "@emotion/css";
import { ISortInfo } from "./types";
import { RenderSkeleton, SearchbarTable } from "./components";
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
  ...props
}: Props<T>) => {
  // -------------------- variables --------------------------
  const { token } = themeContent.useToken();

  // -------------------- hook --------------------------
  const {
    loading,
    isMobile,
    mobileColumns,
    rows,
    rowSelectionRow,
    paginationData,
    searchValue,
    setSearchValue,
    otherProps,
    featuresMobileColumns,
    onChangeTable,
  } = useDataTable({
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
    ...props,
  });

  return loading ? (
    <RenderSkeleton columns={props.columns} />
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
            {featuresMobileColumns()}
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
                // onPressEnter={() => console.log("press")}
              />
            )}
            <Table
              rowKey={rowKey}
              dataSource={rows}
              scroll={{ x: "max-content" }}
              {...(withPagination
                ? {
                  pagination: paginationData,
                }
                : {
                  pagination: false,
                })}
              {...(selection && {
                rowSelection: rowSelectionRow,
              })}
              onChange={onChangeTable}
              {...otherProps}
            />
          </Flex>
        </Section>
      )}
    </>
  );
};
