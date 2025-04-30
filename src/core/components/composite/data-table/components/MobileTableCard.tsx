import { Checkbox } from "@/core/components/base/checkbox";
import { ColumnType, ExpandableConfig } from "@/core/components/base/table";
import { Divider } from "@/core/components/base/divider";
import { Flex } from "@/core/components/base/flex";
import { Space } from "@/core/components/base/space";
import { Typography } from "@/core/components/base/typography";
import { ChevronDown, ChevronUp } from "@/core/icons";
import { useState } from "react";
import { useStyles } from "../styled";

// ---------------------- types ---------------------
type Props<T extends object> = {
  columns: ColumnType[];
  row: any;
  selection: boolean;
  selectionKey: string[];
  expandable?: ExpandableConfig<T>;
  // pagination: { current: number; pageSize: number; total?: number };
  index: number;
  onChangeCheckbox: (row: any, checked: boolean, key: string) => void;
};

export const MobileTablesCard = <T extends object>({
  selection,
  selectionKey,
  expandable,
  columns,
  row,
  index,
  onChangeCheckbox,
}: Props<T>) => {
  // ---------------------- variables ---------------------
  const [isExpandedRow, setIsExpandedRow] = useState(false);
  const { styles } = useStyles();
  const checkExpandedRow = () => {
    if (isExpandedRow) {
      return <ChevronDown />;
    } else {
      return <ChevronUp />;
    }
  };

  return (
    <Flex className={styles.mobileColumns}>
      {selection && (
        <Space>
          <Checkbox
            checked={selectionKey.includes((index + 1).toString())}
            onChange={(event) =>
              onChangeCheckbox(
                row,
                event.target.checked,
                (index + 1).toString(),
              )
            }
          />
        </Space>
      )}
      <Flex className={styles.columnsContainer}>
        {columns.map((col: any) => (
          <Flex
            vertical
            key={col.key}
            style={{
              width: col.key === "actions" ? "100%" : "",
            }}
          >
            {col.key === "actions" ? (
              <Flex vertical className={styles.columnActions}>
                <Divider />
                {col.render?.(row)}
              </Flex>
            ) : (
              <Flex
                style={{
                  width: col.width,
                  minWidth: col.minWidth,
                }}
              >
                <Typography>
                  <strong>{col.title} : </strong>
                  {col.render?.(col, row) ?? row[col.key]}
                </Typography>
              </Flex>
            )}
          </Flex>
        ))}
        {isExpandedRow && expandable?.expandedRowRender && (
          <Flex className={styles.expandedRenderContainer}>
            {expandable.expandedRowRender(row, index, 0, isExpandedRow)}
          </Flex>
        )}
      </Flex>
      {expandable && (
        <Flex
          className={styles.expandedIcons}
          onClick={() => setIsExpandedRow(!isExpandedRow)}
        >
          {checkExpandedRow()}
        </Flex>
      )}
    </Flex>
  );
};
