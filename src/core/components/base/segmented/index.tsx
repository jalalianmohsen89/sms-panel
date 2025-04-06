import { Segmented as BaseSegmented, SegmentedProps } from "antd";

export type Props<T extends object | string | number> = Pick<
  SegmentedProps<T>,
  | "label"
  | "rootClassName"
  | "options"
  | "block"
  | "size"
  | "vertical"
  | "onChange"
>;

export const Segmented = <T extends object | string | number>(
  props: Props<T>
) => <BaseSegmented {...props} />;
