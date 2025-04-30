import { Flex } from "@/core/components/base/flex";
import { ColumnType } from "@/core/components/base/table";
import { Skeleton } from "@/core/components/base/skeleton";
import { FC, memo } from "react";
import { useStyles } from "../styled";

type SkeletonItemProps = {
  item: number;
  columns: ColumnType[];
};

const SkeletonItem = memo(({ item, columns }: SkeletonItemProps) => {
  const { styles } = useStyles();

  return (
    <Flex vertical gap={"20px"} className={styles.skeletonContainer} key={item}>
      <Flex gap="20px" className={styles.skeletonList}>
        {columns?.map((row) => (
          <Skeleton.Input
            active
            size="small"
            className={styles.skeletonStyle}
            key={row.key}
          />
        ))}
      </Flex>
    </Flex>
  );
});

type Props = {
  columns: ColumnType[];
};
export const RenderSkeleton: FC<Props> = ({ columns }) => (
  <>
    {[1, 2, 3, 4, 5].map((item) => (
      <SkeletonItem key={item} item={item} columns={columns} />
    ))}
  </>
);
