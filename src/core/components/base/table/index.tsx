import { Table as BaseTable, TableProps } from "antd";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import { ExpandableConfig } from "antd/es/table/interface";

declare module "antd/es/table" {
  interface ColumnType {
    minWidth?: number; // پراپ جدید
  }
}

export type Props<T extends object> = Pick<
  TableProps<T>,
  | "dataSource"
  | "rowKey"
  | "pagination"
  | "loading"
  | "title"
  | "size"
  | "bordered"
  | "showHeader"
  | "footer"
  | "locale"
  | "tableLayout"
  | "onChange"
  | "rowSelection"
  | "sortDirections"
  | "scroll"
  | "virtual"
  | "expandable"
  | "className"
  | "style"
  | "showSorterTooltip"
> & {
  columns: (ColumnGroupType<T> | ColumnType<T>)[];
};

export const Table = <T extends object>(props: Props<T>) => (
  <BaseTable {...props} />
);

export type { ColumnGroupType, ColumnType, ExpandableConfig };
