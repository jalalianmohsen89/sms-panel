import { FC } from "react";
import { default as BaseCheckbox } from "antd/es/checkbox";
import type { CheckboxProps } from "antd/es/checkbox";
import Group from "antd/es/checkbox/Group";

type Props = Pick<
  CheckboxProps,
  | "defaultChecked"
  | "prefixCls"
  | "checked"
  | "style"
  | "title"
  | "onChange"
  | "onClick"
  | "type"
  | "skipGroup"
  | "value"
  | "name"
  | "children"
  | "id"
  | "indeterminate"
  | "required"
  | "disabled"
  | "className"
>;
export const Checkbox: FC<Props> & { Group: typeof Group } = (props) => (
  <BaseCheckbox {...props} />
);
Checkbox.Group = Group;

export type { CheckboxChangeEvent } from "antd/es/checkbox";
