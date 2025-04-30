import { FC } from "react";
import { default as BaseAutoComplete } from "antd/es/auto-complete";
import type { AutoCompleteProps } from "antd/es/auto-complete";

type Props = Pick<
  AutoCompleteProps,
  | "allowClear"
  | "value"
  | "dataSource"
  | "style"
  | "status"
  | "children"
  | "popupClassName"
  | "popupMatchSelectWidth"
  | "options"
  | "size"
  | "onSearch"
  | "onChange"
  | "onSelect"
  | "dropdownRender"
  | "placeholder"
>;
export const AutoComplete: FC<Props> = (props) => (
  <BaseAutoComplete {...props} />
);
