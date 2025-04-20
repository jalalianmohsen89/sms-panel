import {
  Flex,
  Space,
  Tooltip,
  Typography,
  useBreakpoint,
} from "@/core/components/base";
import { css } from "@emotion/css";
import { FC, ReactNode } from "react";
import { EllipsisVertical } from "@/core/icons";
import { ActionContainer } from "../styled";
import { theme as themeContent } from "@/core/theme";

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
              {list.map((item, index) => (
                <ActionContainer
                  token={token}
                  key={index}
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
          <Space
            className={css`
              cursor: pointer;
            `}
          >
            <EllipsisVertical />
          </Space>
        </Tooltip>
      ) : (
        <Flex
          className={css`
            align-items: center;
            gap: 20px;
          `}
        >
          {list.map((item, index) => (
            <Flex
              className={css`
                align-items: center;
                cursor: pointer;
                gap: 10px;
              `}
              key={index}
              onClick={() => onAction(row, item)}
            >
              <Tooltip title={item.title}>{item.icon}</Tooltip>
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};
