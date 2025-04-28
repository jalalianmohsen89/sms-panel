import { ColumnType } from "@/core/components/base/table";
import { Dropdown } from "@/core/components/base/dropdown";
import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import { ArrowDown, ArrowUp } from "@/core/icons";
import { FC } from "react";
import { useStyles } from "../styled";
import { IParams, ISortInfo, SortOrder } from "../types";

const SortIcon = ({ sortDirection }: { sortDirection: SortOrder }) => {
  if (sortDirection === "ascend") return <ArrowUp />;
  if (sortDirection === "descend") return <ArrowDown />;

  return null;
};

const getNextSortOrder = (currentOrder: SortOrder): SortOrder => {
  const orderCycle: Record<string, SortOrder> = {
    ascend: "descend",
    descend: null,
    null: "ascend",
  };

  return orderCycle[currentOrder || "null"] || null;
};

// ---------------------- types ---------------------
type Props = {
  columns: ColumnType[];
  params: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
  onChangeSortMobile?: (order: SortOrder, columnKey: string) => void;
  refreshData?: () => void;
};
export const MobileTableSort: FC<Props> = ({
  columns,
  params,
  setParams,
  onChangeSortMobile,
  refreshData,
}) => {
  // ---------------------- variables ---------------------
  const { styles } = useStyles();
  const sortableColumns: string[] = columns
    .filter((column: ColumnType) => column.sorter)
    .map((column: ColumnType) => column.title as string);

  // ---------------------- methods ---------------------
  const handleSort = (selectedItem: string) => {
    const newOrder = getNextSortOrder(params?.sort_direction ?? "ascend");
    const selectedColumn = columns.find(
      (col: ColumnType) => col.title === selectedItem,
    );

    const sortParams: ISortInfo = {
      sort_direction: newOrder,
      sort_field: String(selectedColumn?.key) || "",
    };

    setParams((prev) => ({
      ...prev,
      sort: sortParams,
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
