import { Row as BaseRow, RowProps } from "antd";
import { FC } from "react";
import { useStyles } from "./styled";

type Props = Pick<
  RowProps,
  "gutter" | "align" | "justify" | "wrap" | "children" | "className"
>;
export const Row: FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, ...otherProps } = props;
  const { styles } = useStyles();

  return <BaseRow {...otherProps} className={styles.width} />;
};
