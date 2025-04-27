import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css }) => ({
  mobileColumnsContainer: {
    width: "100%",
    flexDirection: "column",
  },
  mobileColumns: {
    width: "100%",
    border: `1px solid ${token.colorBorder}`,
    backgroundColor: token.colorBgContainer,
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    gap: "10px",
    alignItems: "flex-start",
  },
  featuresMobileColumnsContainer: {
    width: "100%",
    marginBottom: "10px",
  },
  columnsContainer: {
    width: "100%",
    flexWrap: "wrap",
    gap: "10px 20px",
  },
  columnActions: {
    width: "100%",
    alignItems: "flex-end",
    gap: "10px",
  },
  expandedRenderContainer: {
    width: "100%",
    backgroundColor: token.colorBgContainer,
  },
  expandedIcons: {
    width: "20px",
    cursor: "pointer",
  },
  actionContainer: {
    alignItems: "center",
    cursor: "pointer",
    gap: "10px",
    padding: "5px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
    svg: {
      color: token.colorText,
    },
    "&:hover": {
      backgroundColor: token.colorBgContainerDisabled,
    },
  },
  actionListContainer: {
    alignItems: "center",
    gap: "20px",
  },
  actionList: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "10px",
  },
  selectionContainer: {
    gap: "10px",
    textWrap: "nowrap",
  },
  dropdownContainer: css`
    width: 100%;
    z-index: 10;
    margin: 0 auto;
  `,
  menuItem: css`
    width: 100%;
    padding: 0.2rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${token.colorBgLayout};
    align-items: center;
    justify-content: space-around;
  `,
  sortButton: css`
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    background-color: ${token.colorPrimary};
    color: ${token.colorBgBase};
    padding: 0.2rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
  `,
  skeletonContainer: {
    margin: "2rem 0",
  },
  skeletonList: {
    width: "100%",
    flex: 1,
  },
  skeletonItem: {
    width: "100%!important",
  },
  cursor: {
    cursor: "pointer",
  },
}));
