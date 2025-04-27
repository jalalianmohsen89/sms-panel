import { hexToRgba } from "@/core/functions";
import { IPattern } from "@/core/types";

import { createStyles } from "@/core/theme/styled";

export const useStyles = createStyles(({ token }, pattern: IPattern) => ({
  masterHeader: {
    width: "100%",
    padding: "0 1rem",
    height: "67px",
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${token?.colorBorder}`,
    position: "sticky",
    top: 0,
    zIndex: 5,
    background: hexToRgba(token.colorBgContainer, +pattern?.layoutOpacity),
    backdropFilter: `blur(${pattern?.blur}px)`,
  },
  toolsContainer: {
    width: "100%",
    maxWidth: "300px",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  toolsItemContainer: {
    width: "35px",
    height: "35px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },
  sunnyIcon: {
    color: token?.colorWhite,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: token?.colorWarningText,
      animation: "sunny 2s ease-in-out infinite",
    },
    "@keyframes sunny": {
      "0%": {
        transform: "rotate(0deg)",
      },

      "50%": {
        transform: "rotate(180deg)",
      },

      "100%": {
        transform: "rotate(0deg)",
      },
    },
  },
  moonIcon: {
    color: token?.colorText,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: token?.colorBgMask,
      animation: "moon 2s ease-in-out infinite",
      "@keyframes moon": {
        "0%": {
          transform: "rotate(0deg)",
        },

        "50%": {
          transform: "rotate(360deg)",
        },
        "100%": {
          transform: "rotate(0deg)",
        },
      },
    },
  },
}));
