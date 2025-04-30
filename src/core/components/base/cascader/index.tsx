import { FC } from "react";
import { default as BaseCascader } from "antd/es/cascader";
import type { CascaderProps } from "antd/es/cascader";

type Props = {
  defaultValue?: any[];
  multiple?: true;
  size?: "small" | "middle" | "large";
  options: CascaderProps<any>["options"];
  showArrow?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  variant?: "outlined" | "filled";
  onChange?: (value: any[], selectedOptions: any[]) => void;
};

export const Cascader: FC<Props> = (props) => <BaseCascader {...props} />;
