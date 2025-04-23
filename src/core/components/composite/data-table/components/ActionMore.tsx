import {
  Flex,
  Tooltip,
  Typography,
  useBreakpoint,
} from "@/core/components/base";
import { EllipsisVertical } from "@/core/icons";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { FC, ReactNode } from "react";
import { ActionContainer } from "../styled";

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
  const { token } = themeContent.useToken();
  const breakpoints = useBreakpoint();
  const isMobile = !breakpoints.md;

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
                <ActionContainer
                  token={token}
                  key={item.title}
                  onClick={() => onAction(row, item)}
                >
                  {item.icon}
                  <Typography>{item.title}</Typography>
                </ActionContainer>
              ))}
            </Flex>
          )}
          placement={isMobile ? "right" : "left"}
          arrow
        >
          <div
            className={css`
              cursor: pointer;
            `}
          >
            <EllipsisVertical />
          </div>
        </Tooltip>
      ) : (
        <Flex
          className={css`
            align-items: center;
            gap: 20px;
          `}
        >
          {list.map((item) => (
            <div
              className={css`
                display: flex;
                align-items: center;
                cursor: pointer;
                gap: 10px;
              `}
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
