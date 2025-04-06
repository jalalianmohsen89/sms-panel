import { FC } from "react";
import { Cascader as BaseCascader } from "antd";
import { CascaderProps } from "antd/es/cascader";

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
