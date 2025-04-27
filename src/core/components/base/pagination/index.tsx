import { FC } from "react";
import { Pagination as BasePagination } from "antd";
import { PaginationProps } from "antd/es/pagination/Pagination";

export type Props = Pick<
  PaginationProps,
  | "className"
  | "pageSizeOptions"
  | "current"
  | "defaultCurrent"
  | "total"
  | "pageSize"
  | "defaultPageSize"
  | "showQuickJumper"
  | "disabled"
  | "style"
  | "prevIcon"
  | "nextIcon"
  | "onChange"
  | "showSizeChanger"
>;
export const Pagination: FC<Props> = (props) => <BasePagination {...props} />;
