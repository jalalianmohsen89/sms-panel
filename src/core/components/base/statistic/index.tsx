import { FC } from "react";
import { Statistic as BaseStatistic, StatisticProps } from "antd";
import Countdown from "antd/es/statistic/Countdown";

type Props = Pick<
  StatisticProps,
  | "value"
  | "className"
  | "rootClassName"
  | "valueRender"
  | "title"
  | "prefix"
  | "suffix"
  | "loading"
  | "onMouseEnter"
  | "onMouseLeave"
>;
export const Statistic: FC<Props> & {
  Countdown: typeof Countdown;
} = (props) => <BaseStatistic {...props} />;

Statistic.Countdown = Countdown;

export { Countdown };
