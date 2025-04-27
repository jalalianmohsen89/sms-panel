import { ColumnType, Flex, Skeleton } from "@/core/components/base";
import { FC } from "react";
import { useStyles } from "../styled";

type Props = {
  columns: ColumnType[];
};
export const RenderSkeleton: FC<Props> = ({ columns }) => {
  const { styles } = useStyles();

  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <Flex
          vertical
          gap={"20px"}
          className={styles.skeletonContainer}
          key={item}
        >
          <Flex gap="20px" className={styles.skeletonList}>
            {columns?.map((row) => (
              <Skeleton.Input
                active
                size="large"
                key={row.key}
                className={styles.skeletonItem}
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  );
};
