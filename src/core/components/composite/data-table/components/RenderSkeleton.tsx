import { FC } from "react";
import { ColumnType, Flex, Skeleton } from "@/core/components/base";
import { css } from "@emotion/css";

type Props = {
  columns: ColumnType[];
};
export const RenderSkeleton: FC<Props> = ({ columns }) => (
  <>
    {[1, 2, 3, 4, 5].map((item) => (
      <Flex
        vertical
        gap={"20px"}
        className={css`
          margin: 2rem 0;
        `}
        key={item}
      >
        <Flex
          gap="20px"
          className={css`
            flex: 1;
            width: 100%;
          `}
        >
          {columns?.map((row) => (
            <Skeleton.Input
              active
              size="large"
              key={row.key}
              className={css`
                width: 100% !important;
              `}
            />
          ))}
        </Flex>
      </Flex>
    ))}
  </>
);
