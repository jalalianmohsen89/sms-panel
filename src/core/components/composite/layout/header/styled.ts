import { Avatar, Flex, Layout } from "@/core/components/base";
import styled from "@emotion/styled";
import { PatternType, TokenType } from "@/core/types";
import { hexToRgba } from "@/core/functions";
import { Moon, Notifications, Sunny } from "@/core/icons";

const { Header } = Layout;

export const MasterHeader = styled(Header)<TokenType & PatternType>(
  ({ token, pattern }) => ({
    width: "100%",
    padding: "0 1rem",
    height: "67px",
    display: "flex",
    alignItems: "center",
    background: hexToRgba(token.colorBgContainer, +pattern?.layoutOpacity),
    backdropFilter: `blur(${pattern?.blur}px)`,
    borderBottom: `1px solid ${token?.colorBorder}`,
    position: "sticky",
    top: 0,
    zIndex: 5
  })
);

export const ToolsContainer = styled(Flex)({
  width: "100%",
  maxWidth: "300px",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 10
});

export const ToolsItemContainer = styled(Flex)({
  width: "35px",
  height: "35px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer"
});

export const SunnyIcon = styled(Sunny)<TokenType>(({ token }) => ({
  color: token.colorWhite,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    color: token.colorWarningText,
    animation: "sunny 2s ease-in-out infinite"
  },
  "@keyframes sunny": {
    "0%": {
      transform: "rotate(0deg)"
    },

    "50%": {
      transform: "rotate(180deg)"
    },

    "100%": {
      transform: "rotate(0deg)"
    }
  }
}));

export const MoonIcon = styled(Moon)<TokenType>(({ token }) => ({
  color: token.colorText,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    color: token.colorBgMask,
    animation: "moon 2s ease-in-out infinite",
    "@keyframes moon": {
      "0%": {
        transform: "rotate(0deg)"
      },

      "50%": {
        transform: "rotate(360deg)"
      },
      "100%": {
        transform: "rotate(0deg)"
      }
    }
  }
}));

export const NotificationIcon = styled(Notifications)({
  "&:hover": {
    animation: "notif 1s ease-in-out 3"
  },
  "@keyframes notif": {
    "0%": {
      transform: "rotateZ(-45deg)"
    },

    "50%": {
      transform: "rotateZ(45deg)"
    },
    "100%": {
      transform: "rotateZ(-45deg)"
    }
  }
});

export const AvatarUser = styled(Avatar)({
  gap: 20,
  cursor: "pointer",
  backgroundColor: "orange"
});
