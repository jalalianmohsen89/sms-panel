import { Typography } from "@/core/components/base/typography";
import dayjs from "@/core/functions/dayjs";

export const ConvertDate = (props: any) => {
  const dateValue = props.date ? dayjs(props.date).format("YYYY/MM/DD") : "";

  return <Typography>{dateValue}</Typography>;
};
