import { createStyles } from "@/core/theme/styled";

export const useStyles = createStyles(({ token }) => ({
  notificationIcon: {
    "&:hover": {
      animation: "notif 1s ease-in-out 3",
    },
    "@keyframes notif": {
      "0%": {
        transform: "rotateZ(-45deg)",
      },

      "50%": {
        transform: "rotateZ(45deg)",
      },
      "100%": {
        transform: "rotateZ(-45deg)",
      },
    },
  },

  dropdownContainer: {
    width: "35px",
    height: "35px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },

  dropdownRenderContainer: {
    width: "400px",
    border: `1px solid ${token.colorBorder}`,
    borderRadius: "8px",
    backgroundColor: `${token.colorBgLayout}`,
  },

  sectionContainer: {
    gap: "12px",
    border: `1px solid ${token.colorBorder}`,
  },

  sectionButtons: {
    margin: "0 1.5rem 1rem",
    gap: "5px",
    justifyContent: "flex-end",
  },

  dropdownPadding: {
    paddingTop: "1rem",
    paddingLeft: "1rem",
  },

  headerNotificationContainer: {
    padding: "12px 1rem",
    borderBottom: `1px solid ${token.colorBorder}`,
  },
  contentNotificationContainer: {
    borderRadius: "8px",
    backgroundColor: token.colorBgContainerDisabled,
    padding: "10px 1rem",
    margin: "0 2.5rem 0.5rem 1.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },

  dateNotificationContainer: {
    width: "30px",
    borderRadius: "5px",
    border: `1px solid ${token.colorWarning}`,
    alignItems: "center",
  },
  dateNotification: {
    borderBottom: `1px solid ${token.colorWarning}`,
    backgroundColor: `rgba(${token.colorWarningTextHover})`,
    padding: "3px",
  },
  dateTitleNotification: {
    color: token.colorWarning,
  },
  datePaddingNotification: {
    padding: "3px",
  },
  titleSize: {
    fontSize: "1rem",
  },

  contentText: {
    fontSize: "12px",
  },

  contentDate: {
    fontSize: "13px",
  },

  avatarUser: {
    gap: 20,
    cursor: "pointer",
    backgroundColor: "orange",
  },

  flex: {
    display: "flex",
  },
}));
