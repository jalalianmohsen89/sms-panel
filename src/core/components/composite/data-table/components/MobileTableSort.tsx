import {
  ColumnType,
  Dropdown,
  Flex,
  Typography,
  GlobalToken
} from "@/core/components/base";
import { IParams, ISortInfo, SortOrder } from "../types";
import { ArrowDown, ArrowUp } from "@/core/icons";
import { FC } from "react";
import { css } from "@emotion/css";

const SortIcon = ({ sortDirection }: { sortDirection: SortOrder }) => {
  if (sortDirection === "ascend") return <ArrowUp />;
  if (sortDirection === "descend") return <ArrowDown />;

  return null;
};

const getNextSortOrder = (currentOrder: SortOrder): SortOrder => {
  const orderCycle: Record<string, SortOrder> = {
    ascend: "descend",
    descend: null,
    null: "ascend"
  };

  return orderCycle[currentOrder || "null"] || null;
};

// ---------------------- types ---------------------
type Props = {
  columns: ColumnType[];
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
  token: GlobalToken;
  onChangeSortMobile?: (order: SortOrder, columnKey: string) => void;
  refreshData?: () => void;
};
export const MobileTableSort: FC<Props> = ({
  columns,
  params,
  setParams,
  token,
  onChangeSortMobile,
  refreshData
}) => {
  // ---------------------- variables ---------------------
  const styles = {
    dropdownContainer: css`
      width: 100%;
      z-index: 10;
      margin: 0 auto;
    `,
    menuItem: css`
      width: 100%;
      padding: 0.2rem 0.6rem;
      border-radius: 8px;
      cursor: pointer;
      background-color: ${token.colorBgLayout};
      align-items: center;
      justify-content: space-around;
    `,
    sortButton: css`
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      background-color: ${token.colorPrimary};
      color: ${token.colorBgBase};
      padding: 0.2rem 0.6rem;
      border-radius: 8px;
      cursor: pointer;
    `
  };
  const sortableColumns: string[] = columns
    .filter((column: ColumnType) => column.sorter)
    .map((column: ColumnType) => column.title as string);

  // ---------------------- methods ---------------------
  const handleSort = (selectedItem: string) => {
    const newOrder = getNextSortOrder(params?.sort_direction ?? "ascend");
    const selectedColumn = columns.find(
      (col: ColumnType) => col.title === selectedItem
    );

    const sortParams: ISortInfo = {
      sort_direction: newOrder,
      sort_field: String(selectedColumn?.key) || ""
    };

    setParams((prev) => ({
      ...prev,
      sort: sortParams
    }));

    onChangeSortMobile?.(sortParams.sort_direction, sortParams.sort_field);
    refreshData?.();
  };

  const renderMenuItem = (title: string, index: number) => (
    <Flex
      key={index}
      className={styles.menuItem}
      onClick={() => handleSort(title)}
    >
      <Typography>{title}</Typography>
      <SortIcon sortDirection={params?.sort_direction ?? "ascend"} />
    </Flex>
  );

  // ---------------------- render ---------------------
  return (
    <Dropdown
      dropdownRender={() => (
        <Flex className={styles.dropdownContainer}>
          {sortableColumns.map(renderMenuItem)}
        </Flex>
      )}
    >
      <Flex className={styles.sortButton}>مرتب سازی</Flex>
    </Dropdown>
  );
};
