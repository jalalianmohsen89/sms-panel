import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  position: {
    position: "relative",
  },
  textareaStyle: {
    width: "100%",
    padding: "1rem 1rem 3rem",
  },
  ToolbarEditorContainer: {
    width: "100%",
    borderTop: `2px dashed ${token.colorBorder}`,
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "0.5rem",
    gap: 10,
  },
  ToolbarEditorItem: {
    padding: "4px 1rem",
    backgroundColor: token.colorBgContainerDisabled,
    color: token.colorTextSecondary,
    borderRadius: 8,
  },
}));
