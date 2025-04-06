import { FC } from "react";
import { AutoComplete as BaseAutoComplete, AutoCompleteProps } from "antd";

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
