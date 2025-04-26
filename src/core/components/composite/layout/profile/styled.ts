import { createStyles } from "@/core/theme/styled";

export const useStyles = createStyles(({ token }) => ({
  dropdownProfileContainer: {
    gap: 10,
    padding: "1rem 0",
    userSelect: "none",
  },
  userRole: {
    fontSize: "11px",
    fontWeight: "bold",
    color: token.colorPrimaryText,
  },
  avatarProfile: {
    gap: 20,
    cursor: "pointer",
    backgroundColor: token.colorPrimary,
  },
  dropdownOption: {
    alignItems: "center",
    gap: 10,
    padding: "6px 1.5rem",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      backgroundColor: token.colorBgContainerDisabled,
    },
  },
  porfileContainer: {
    width: "200px",
    padding: "1rem",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: token.colorBgLayout,
  },
  userPadding: {
    padding: "0 0.8rem",
  },
  userPostTitle: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  settingOption: {
    padding: "0 1rem",
    margin: "0 auto",
  },
  settingButton: {
    fontSize: "12px",
  },
  profileOverlay: {
    paddingTop: "3px",
    backgroundColor: "transparent",
  },
  profileDropdownContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    width: "100%",
  },
  profileDropdownIcon: {
    transform: "rotate(90deg)",
    cursor: "pointer",
  },
}));
