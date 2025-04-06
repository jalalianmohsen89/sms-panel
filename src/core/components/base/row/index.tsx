import { FC } from "react";
import { Row as BaseRow, RowProps } from "antd";
import { css } from "@emotion/css";

type Props = Pick<
  RowProps,
  "gutter" | "align" | "justify" | "wrap" | "children" | "className"
>;
export const Row: FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, ...otherProps } = props;

  return (
    <BaseRow
      {...otherProps}
      className={css`
        width: 100%;
      `}
    />
  );
};
