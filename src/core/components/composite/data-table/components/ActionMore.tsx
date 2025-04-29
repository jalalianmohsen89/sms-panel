import { Flex } from "@/core/components/base/flex";
import { Tooltip } from "@/core/components/base/tooltip";
import { Typography } from "@/core/components/base/typography";
import { useBreakpoint } from "@/core/components/base/grid";
import { EllipsisVertical } from "@/core/icons";
import { FC, ReactNode } from "react";
import { useStyles } from "../styled";

// ---------------------- types ---------------------
type Props = {
  row?: any;
  isCollapse?: boolean;
  isPageBuilder?: boolean;
  list: {
    title: string;
    icon: ReactNode;
    action: ((...data: any[]) => void) | string;
  }[];
  onSelectAction?: (mdoe: string) => void;
};
export const ActionMore: FC<Props> = ({
  isCollapse,
  isPageBuilder = false,
  row,
  list,
  onSelectAction,
}) => {
  // -------------------- variables --------------------------
  const breakpoints = useBreakpoint();
  const isMobile = !breakpoints.md;
  const { styles } = useStyles();

  // ---------------------- methods ---------------------
  const onAction = (row: any, item: any) => {
    if (isPageBuilder) {
      onSelectAction?.(item.action);
    } else {
      item.action(row);
    }
  };

  return (
    <>
      {isCollapse ? (
        <Tooltip
          title={() => (
            <Flex vertical>
              {list.map((item) => (
                <Flex
                  className={styles.actionContainer}
                  key={item.title}
                  onClick={() => onAction(row, item)}
                >
                  {item.icon}
                  <Typography>{item.title}</Typography>
                </Flex>
              ))}
            </Flex>
          )}
          placement={isMobile ? "right" : "left"}
          arrow
        >
          <div className={styles.cursor}>
            <EllipsisVertical />
          </div>
        </Tooltip>
      ) : (
        <Flex className={styles.actionListContainer}>
          {list.map((item) => (
            <div
              className={styles.actionList}
              key={item.title}
              onClick={() => onAction(row, item)}
            >
              <Tooltip title={item.title}>{item.icon}</Tooltip>
            </div>
          ))}
        </Flex>
      )}
    </>
  );
};
