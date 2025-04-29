import { FC } from "react";
import { default as BaseRadio } from "antd/es/radio";
import type { RadioChangeEvent } from "antd/es/radio";
import { RadioGroupProps } from "antd/es/radio/interface";

type Props = Pick<
  RadioGroupProps,
  | "defaultValue"
  | "value"
  | "onChange"
  | "size"
  | "disabled"
  | "name"
  | "children"
  | "id"
  | "optionType"
  | "buttonStyle"
  | "onBlur"
  | "block"
>;
export const Radio: FC<Props> & {
  Group: typeof BaseRadio.Group;
  Button: typeof BaseRadio.Button;
} = (props) => <BaseRadio {...props} />;

Radio.Group = BaseRadio.Group;
Radio.Button = BaseRadio.Button;

export type { RadioChangeEvent };
