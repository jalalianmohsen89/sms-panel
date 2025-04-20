import {
  Checkbox,
  ColumnType,
  Divider,
  Flex,
  Space,
  Typography,
  ExpandableConfig,
  GlobalToken,
} from "@/core/components/base";
import { MobileColumns } from "../styled";
import { css } from "@emotion/css";
import { ChevronDown, ChevronUp } from "@/core/icons";
import { useState } from "react";

// ---------------------- types ---------------------
type Props<T extends object> = {
  token: GlobalToken;
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
  token,
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
  const checkExpandedRow = () => {
    if (isExpandedRow) {
      return <ChevronDown />;
    } else {
      return <ChevronUp />;
    }
  };

  return (
    <MobileColumns token={token}>
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
      <Flex
        className={css`
          width: 100%;
          flex-wrap: wrap;
          gap: 10px 20px;
        `}
      >
        {columns.map((col: any, key) => (
          <Flex
            vertical
            key={key}
            className={
              col.key === "actions"
                ? css`
                    width: 100%;
                  `
                : ""
            }
          >
            {col.key === "actions" ? (
              <Flex
                vertical
                className={css`
                  width: 100%;
                  align-items: flex-end;
                  gap: 10px;
                `}
              >
                <Divider />
                {col.render?.(row)}
              </Flex>
            ) : (
              <Flex
                className={css`
                  width: ${col.width};
                  min-width: ${col.minWidth};
                `}
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
          <Flex
            className={css`
              width: 100%;
              background-color: ${token.colorBgContainer};
            `}
          >
            {expandable.expandedRowRender(row, index, 0, isExpandedRow)}
          </Flex>
        )}
      </Flex>
      {expandable && (
        <Flex
          className={css`
            width: 20px;
            cursor: pointer;
          `}
          onClick={() => setIsExpandedRow(!isExpandedRow)}
        >
          {checkExpandedRow()}
        </Flex>
      )}
    </MobileColumns>
  );
};
